const { ImageKit } = require('@imagekit/nodejs');

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
    const result = await ImageKitClient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "f2-backend-cluster1/music"    
    })

    return result;
    
}

async function uploadProfileImage(file) {
    return ImageKitClient.files.upload({
        file,
        fileName: "profile_" + Date.now(),
        folder: "f2-backend-cluster1/profiles",
    })
}

async function uploadArtwork(file) {
    return ImageKitClient.files.upload({
        file,
        fileName: "artwork_" + Date.now(),
        folder: "f2-backend-cluster1/artwork",
    });
}

module.exports = { uploadFile, uploadProfileImage, uploadArtwork };