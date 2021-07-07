const aws = require('aws-sdk');
const path = require('path');
const mime = require('mime');
const fs = require('fs');

const multerConfig = require('../config/multerConfig')

let client;

class S3Storage {

    constructor(){
        client = new aws.S3({
            region: 'sa-east-1',
        });
    }

    async saveFile(filename) {
        const originalPath = path.resolve(multerConfig.directory, filename);

        const ContentType = mime.getType(originalPath);

        if(!ContentType) {
            throw new Error("File not found");
        }

        const fileContent = await fs.promises.readFile(originalPath);

        client.putObject({
            Bucket: proccess.env.S3_BUCKET,
            Key: filename,
            ACL: 'public-read',
            Body: fileContent,
            ContentType,
        }).promise();

        await fs.promises.unlink(originalPath);
    }

    async deleteFile(filename) {
        client.deleteObject({
            Bucket: proccess.env.S3_BUCKET,
            Key: filename,
        }).promise();
    }
}

module.exports = S3Storage;