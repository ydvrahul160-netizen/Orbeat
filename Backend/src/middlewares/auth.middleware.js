const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function getAuthenticatedUser(req) {
    const token = req.cookies.token;

    if(!token){
        return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return userModel.findById(decoded.id);
}

// here authArtist is a Middleware name
async function authArtist(req, res, next){
    try{
        const user = await getAuthenticatedUser(req);

        if(!user){
            return res.status(401).json({message: "Unauthorized"})
        }

        if(user.role !== "artist"){
          return res.status(403).json({message: "You don't have access"})
        }

        req.user = user;

        next()
    }
    catch(err){
        console.log(err);
        return res.status(401).json({message: "Unauthorized"})
    }
}



async function authUser(req, res, next){
    try{
        const user = await getAuthenticatedUser(req);

        if(!user || (user.role !== "user" && user.role !== "artist")){
            if(!user){
                return res.status(401).json({message: "Unauthorized"})
            }
            return res.status(403).json({message: "You don't have access"})
        }

        req.user = user;

        next()
        
    }catch(err){
        console.log(err);
        return res.status(401).json({message: "Unauthorized"})
    }
}


module.exports = {authArtist, authUser, getAuthenticatedUser}
