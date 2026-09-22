const express = require('express');
const musicController = require("../controllers/music.controller");
const searchController = require("../controllers/search.controller");
const artworkController = require("../controllers/artwork.controller");
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
    fileFilter: (_req, file, callback) => {
        const audioTypes = new Set([
            "audio/aac",
            "audio/flac",
            "audio/m4a",
            "audio/mp4",
            "audio/mpeg",
            "audio/ogg",
            "audio/wav",
            "audio/webm",
            "audio/x-m4a",
            "audio/x-wav",
        ])

        const imageTypes = new Set([
            "image/jpeg",
            "image/png",
            "image/webp",
        ])

        if (file.fieldname === "music" && audioTypes.has(file.mimetype)) {
            return callback(null, true)
        }

        if (
            file.fieldname === "coverImage" &&
            imageTypes.has(file.mimetype)
        ) {
            return callback(null, true)
        }

        return callback(
            new Error("Only supported audio and image files are allowed.")
        )
    },
})

const artworkUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, callback) => {
        const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
        if (!allowedTypes.has(file.mimetype)) return callback(new Error("Only JPG, PNG, and WebP images are allowed."));
        return callback(null, true);
    },
});



const router = express.Router();

// 1: creating music api, further code/design is in 'routes' folder and in 'music.controller' file
router.post(
    "/upload",
    authMiddleware.authArtist,
    upload.fields([
        { name: "music", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    musicController.createMusic
)

router.get("/mine", authMiddleware.authArtist, musicController.getArtistMusics)

router.patch("/:musicId", authMiddleware.authArtist, musicController.updateMusic)

router.delete("/:musicId", authMiddleware.authArtist, musicController.deleteMusic)

router.post("/:type/:id/artwork", authMiddleware.authArtist, artworkUpload.single("artwork"), artworkController.uploadArtworkForOwner)


// 2: creating album api, further code/design is in 'routes' folder and in 'music.controller' file
router.post("/album", authMiddleware.authArtist, musicController.createAlbum)

router.get("/albums/mine", authMiddleware.authArtist, musicController.getArtistAlbums)

router.patch("/albums/:albumId", authMiddleware.authArtist, musicController.updateAlbum)

router.delete("/albums/:albumId", authMiddleware.authArtist, musicController.deleteAlbum)

router.get("/search", authMiddleware.authUser, searchController.search)

// 3: api for user - can fetch all songs
router.get("/", authMiddleware.authUser, musicController.getAllMusics)

router.post("/:musicId/like", authMiddleware.authUser, musicController.toggleLike)

router.post("/:musicId/comment", authMiddleware.authUser, musicController.addComment)

router.post("/:musicId/play", authMiddleware.authUser, musicController.recordPlay)

// 4: api for user - can fetch allAlbums
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums)

// 5: api for user - can fetch a particular one album
router.get("/albums/:albumId", authMiddleware.authUser, musicController.getAlbumById)

router.use((error, _req, res, _next) => {
    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "Audio files must be 20 MB or smaller." });
    }

    if (error?.message === "Only supported audio files are allowed.") {
        return res.status(415).json({ message: error.message });
    }

    if (error?.message === "Only JPG, PNG, and WebP images are allowed.") {
        return res.status(415).json({ message: error.message });
    }

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "Uploaded files must be 5 MB or smaller." });
    }

    return res.status(500).json({ message: "Music request failed." });
})

module.exports = router;
