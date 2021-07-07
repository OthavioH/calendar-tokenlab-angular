const removePasswords = require('./RemoveUsersPasswords');
const Users = require('../../models/Users');

async function getLoggedUser(req,res) {
    const { email } = req.body;

    const user = await Users.findOne({email:email});

    if(!user) {
        return res.status(400).json({error: 'Usuário não encontrado'});
    }

    removePasswords([user]);

    return res.json({user, imageURL:user.image});
}

module.exports = getLoggedUser;