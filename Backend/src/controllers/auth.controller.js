const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");// hashsing the password 
const crypto = require("crypto");
const { uploadProfileImage } = require("../services/storage.service");

const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000;

function buildUserResponse(user) {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || null,
        bio: user.bio || "",
    }
}

async function updateProfileImage(req, res){
    if(!req.file?.buffer){
        return res.status(400).json({message: "Profile image is required"})
    }

    try{
        const result = await uploadProfileImage(req.file.buffer.toString("base64"));
        if(!result?.url){
            return res.status(502).json({message: "Image storage did not return a file URL"})
        }

        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { profileImage: result.url },
            { new: true, runValidators: true }
        )

        if(!user){
            return res.status(401).json({message: "Unauthorized"})
        }

        return res.status(200).json({
            message: "Profile image updated successfully",
            user: buildUserResponse(user),
        })
    }catch(error){
        console.error("Profile image upload failed:", error)
        return res.status(502).json({message: "Profile image upload failed"})
    }
}

async function updateProfile(req, res){
    const { bio } = req.body;

    if(typeof bio !== "string" || bio.length > 500){
        return res.status(400).json({message: "Bio must be a string of 500 characters or fewer"})
    }

    try{
        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { bio: bio.trim() },
            { new: true, runValidators: true }
        )

        if(!user){
            return res.status(401).json({message: "Unauthorized"})
        }

        return res.status(200).json({ message: "Profile updated successfully", user: buildUserResponse(user) })
    }catch(error){
        console.error("Profile update failed:", error)
        return res.status(500).json({message: "Profile update failed"})
    }
}

function setAuthCookie(res, token) {
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    })
}


// register api controller/code/design/how it works
async function registerUser(req, res){
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: "Username, email, and password are required"})
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({message: "User Already Exists"})
    }

    const hash = await bcrypt.hash(password, 10)


    const user = await userModel.create({
        username,
        email,
        password: hash,
        role: "user"
    })


    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: "7d" })


    setAuthCookie(res, token)


    res.status(201).json({
        message: "User Registered successfully",
        user: buildUserResponse(user)
    })
}


//login api controller/code/design/how it works
async function loginUser(req, res){


    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if(!user){
        return res.status(401).json({message: "invalid username or password"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({message: "invalid username or password"})
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: "7d" })

    setAuthCookie(res, token)

    res.status(200).json({
        message: "User Logged in successfully",
        user: buildUserResponse(user)
    })

}


// logout api controller
async function logoutUser(req, res){
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    })
    res.status(200).json({message: "User logged out successfully"})
}

async function getCurrentUser(req, res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)

        if(!user){
            return res.status(401).json({message: "Unauthorized"})
        }

        return res.status(200).json({user: buildUserResponse(user)})
    }catch(err){
        console.log(err);
        return res.status(401).json({message: "Unauthorized"})
    }
}

async function becomeArtist(req, res){
    try{
        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { role: "artist" },
            { new: true }
        )

        if(!user){
            return res.status(401).json({message: "Unauthorized"})
        }

        const newToken = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "7d" })

        setAuthCookie(res, newToken)

        return res.status(200).json({
            message: "Artist account created successfully",
            user: buildUserResponse(user)
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({message: "Unable to upgrade account"})
    }
}

async function requestPasswordReset(req, res){
    const email = req.body.email?.trim();

    if(!email){
        return res.status(400).json({message: "Email is required"})
    }

    const user = await userModel.findOne({ email });
    if(!user){
        return res.status(202).json({message: "If an account exists, reset instructions will be sent"})
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetTokenExpiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS);
    user.passwordResetTokenUsedAt = undefined;
    await user.save();

    if(process.env.PASSWORD_RESET_DELIVERY !== "configured"){
        return res.status(503).json({
            message: "Password reset delivery is not configured. Configure an email provider before enabling this flow.",
            code: "PASSWORD_RESET_DELIVERY_NOT_CONFIGURED",
        })
    }

    return res.status(202).json({message: "If an account exists, reset instructions will be sent"})
}

async function resetPassword(req, res){
    const { email, token, password } = req.body;

    if(!email || !token || !password){
        return res.status(400).json({message: "Email, reset token, and new password are required"})
    }

    const user = await userModel.findOne({ email });
    if(!user || !user.passwordResetTokenHash || user.passwordResetTokenUsedAt || !user.passwordResetTokenExpiresAt || user.passwordResetTokenExpiresAt < new Date()){
        return res.status(400).json({message: "Invalid or expired reset token"})
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const hashesMatch = crypto.timingSafeEqual(
        Buffer.from(tokenHash, "hex"),
        Buffer.from(user.passwordResetTokenHash, "hex")
    );

    if(!hashesMatch){
        return res.status(400).json({message: "Invalid or expired reset token"})
    }

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetTokenUsedAt = new Date();
    user.passwordResetTokenHash = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    await user.save();

    return res.status(200).json({message: "Password reset successfully"})
}

// note: token blacklisting imp topic


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    becomeArtist,
    requestPasswordReset,
    resetPassword,
    updateProfileImage,
    updateProfile,
}
