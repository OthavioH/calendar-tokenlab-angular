const removePasswords = require('./RemoveUsersPasswords');
const Users = require('../../models/Users');

async function showAllUsers(req,res){
        
    const users = await Users.find();

    removePasswords(users);

    return res.json({users});
}

module.exports = showAllUsers;