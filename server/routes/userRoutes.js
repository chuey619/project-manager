const usersRouter = require('express').Router();

const usersController = require('../controllers/users-controller');

usersRouter.post('/services', usersController.manageServices);

module.exports = usersRouter;
