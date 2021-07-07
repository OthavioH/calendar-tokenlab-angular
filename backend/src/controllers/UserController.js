
const createUser = require('../services/Users/CreateUser');
const showAllUsers = require('../services/Users/ShowAllUsers');
const getLoggedUser = require('../services/Users/GetLoggedUser');
const updateUser = require('../services/Users/UpdateUser');

module.exports = {
    createUser,
    showAllUsers,
    getLoggedUser,
    updateUser
}