const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

module.exports = {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;
            req.body.image = filename;
            return callback(null,filename);
        }
    }),
}