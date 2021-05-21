const express = require('express');

const AuthController = require('./controllers/AuthController');
const AuthMiddleware = require('./middlewares/authMiddleware');
const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');

const routes = express.Router();

routes.get('/',(req,res)=>{
    return res.send("Seja bem-vindo");
});

routes.post('/user/register',UserController.createUser);
routes.post('/user/sign_in',AuthController.loginUser);

routes.get('/users',AuthMiddleware,UserController.showAllUsers);
routes.post('/events/create',AuthMiddleware,EventController.createEvent);
routes.get('/events',AuthMiddleware,EventController.showAllEvents);
routes.delete('/events/delete/',AuthMiddleware,EventController.deleteEvent);
routes.put('/events/update/',AuthMiddleware,EventController.updateEvent);
routes.get('/events/event',AuthMiddleware,EventController.showOneEvent);

module.exports = routes;