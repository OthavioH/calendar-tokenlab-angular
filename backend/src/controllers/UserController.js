const Users = require('../models/Users');
const bcrypt = require('bcrypt');
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
    }
}

function removePasswords(usersList){
    usersList.map((user)=>{
        user.password = undefined;
    });
}