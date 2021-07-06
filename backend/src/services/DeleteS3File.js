const S3Storage = require('../utils/S3Storage');

async function deleteS3File(filename) {
    const s3Storage = new S3Storage();
    await s3Storage.deleteFile(filename);
}

module.exports = deleteS3File;