const bcrypt = require('bcrypt');

const Users = require('../models/Users');
const uploadToS3 = require('../services/UploadToS3');
const deleteS3File = require('../services/DeleteS3File');
const generateToken = require('../services/generateToken');

module.exports = {
    async createUser(req,res){
        const {name,email,password} = req.body;

        const userExists = await Users.findOne({email:email});
        if(userExists){
            return res.status(400).json({error:'Já existe um usuário registrado com este email'})
        }

        const user = await Users.create({
            name:name,
            email:email,
            password:await bcrypt.hash(password,10),
        });
        user.password = undefined;

        return res.json({user,token:generateToken({email:user.email})});
    },
    async showAllUsers(req,res){
        
        const users = await Users.find();

        removePasswords(users);

        return res.json({users});
    },
    async getLoggedUser(req,res) {
        const { email } = req.body;

        const user = await Users.findOne({email:email});

        if(!user) {
            return res.status(400).json({error: 'Usuário não encontrado'});
        }

        user.password = undefined;

        return res.json({user, imageURL:user.image});
    },
    async updateUser(req,res) {
        const { email, name} = req.body;
        const { file } = req;

        await uploadToS3(file);
        const imageURL = `https://token-calendary-1.s3.sa-east-1.amazonaws.com/${file.filename}`;

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
}

function removePasswords(usersList){
    usersList.map((user)=>{
        user.password = undefined;
    });
}