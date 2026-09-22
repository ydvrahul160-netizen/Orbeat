const express = require('express');
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const profileUpload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (_req, file, callback) => {
		const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
		if (!allowedTypes.has(file.mimetype)) {
			return callback(new Error("Only JPG, PNG, and WebP images are allowed."));
		}
		return callback(null, true);
	},
});



const router = express.Router();

// creating register api, further code/design is in routes folder and in auth.controller file
router.post('/register', authController.registerUser);

// creating login api, further code/design is in routes folder and in auth.controller file
router.post('/login', authController.loginUser);

// creating logout api
router.post('/logout', authController.logoutUser)

// current logged-in user from cookie
router.get('/me', authController.getCurrentUser)

router.post('/profile-image', authMiddleware.authUser, profileUpload.single('profileImage'), authController.updateProfileImage)
router.patch('/profile', authMiddleware.authUser, authController.updateProfile)

// password reset request and completion
router.post('/forgot-password', authController.requestPasswordReset)
router.post('/reset-password', authController.resetPassword)

// upgrade a listener account into an artist account
router.post('/become-artist', authMiddleware.authUser, authController.becomeArtist)

router.use((error, _req, res, _next) => {
	if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
		return res.status(413).json({ message: "Profile images must be 5 MB or smaller." });
	}
	if (error?.message === "Only JPG, PNG, and WebP images are allowed.") {
		return res.status(415).json({ message: error.message });
	}
	return res.status(500).json({ message: "Profile image request failed." });
});

module.exports = router;
