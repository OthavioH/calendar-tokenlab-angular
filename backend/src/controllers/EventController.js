const Users = require('../models/Users');
const createEvent = require('../services/Events/CreateEvent');
const showAllEvents = require('../services/Events/ShowAllEvents');
const deleteEvent = require('../services/Events/DeleteEvent');
const updateEvent = require('../services/Events/UpdateEvent');
const showOneEvent = require('../services/Events/ShowOneEvent');

module.exports = {
    createEvent,
    showAllEvents,
    deleteEvent,
    updateEvent,
    showOneEvent,
}