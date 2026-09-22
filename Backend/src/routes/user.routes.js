const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/:userId/follow", authMiddleware.authUser, userController.followArtist);
router.delete("/:userId/follow", authMiddleware.authUser, userController.unfollowArtist);
router.get("/:userId/follow-status", authMiddleware.authUser, userController.getFollowStatus);

module.exports = router;