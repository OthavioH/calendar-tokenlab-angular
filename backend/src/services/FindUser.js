async function findUser(email){
    const userExists = await Users.findOne({email:email});

    if(userExists){
        return userExists;
    }
}

module.exports = findUser;