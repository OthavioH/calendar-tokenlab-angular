const Events = require('../../models/Events');
const filterEvents = require('../FilterEvents');

async function showAllEvents(req,res){
    const { email } = req.body;

    const events = await Events.find({});

    const filteredEvents = await filterEvents(events, email);

    return res.status(200).json(filteredEvents);
}

module.exports = showAllEvents;