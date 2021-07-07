function removePasswords(usersList) {
    usersList.map((user)=>{
        user.password = undefined;
    });
}

module.exports = removePasswords;