const bcrypt = require('bcrypt');
const generateToken = require('../GenerateToken');
const removePasswords = require('./RemoveUsersPasswords');
const Users = require('../../models/Users');

async function createUser(req,res) {
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
        removePasswords([user]);

        return res.json({user,token:generateToken({email:user.email})});
}

module.exports = createUser;