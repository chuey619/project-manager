const teamRouter = require('express').Router();
const teamsController = require('../controllers/teamsController');

teamRouter.get('/', teamsController.index);
teamRouter.get('/:id', teamsController.show);
// teamRouter.post('/', teamsController.create);
// teamRouter.post('/members', teamsController.addMember);
// teamRouter.delete('/members', teamsController.removeMember);
// teamRouter.delete('/', teamsController.delete);

module.exports = teamRouter;
