const uploadToS3 = require('../AWS/UploadToS3');
const deleteS3File = require('../AWS/DeleteS3File');
const Users = require('../../models/Users');

async function updateUser(req,res) {
    const { email, name} = req.body;
    const { file } = req;

    await uploadToS3(file);
    const imageURL = `${proccess.env.AWS_S3_URL}${file.filename}`;

    const user = await Users.findOne({email:email});
    if(!user){
        return res.status(400).json({error:'Este usuário não foi encontrado'});
    }

    const oldImage = user.image;
    if(oldImage != '' && oldImage){
        await deleteS3File(oldImage);
    }

    await Users.updateOne({ email:email }, { name:name, image:imageURL });

    return res.json({imageURL:imageURL});
}

module.exports = updateUser;