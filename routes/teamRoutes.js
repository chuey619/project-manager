const teamRouter = require('express').Router();
const teamsController = require('../controllers/teamsController');
const projectRoutes = require('./projectRoutes');
teamRouter.use('/:team_id/projects', projectRoutes);
teamRouter.get('/', teamsController.index);
teamRouter.get('/:team_id', teamsController.show);
teamRouter.post('/', teamsController.create);
teamRouter.post('/:team_id/members', teamsController.addMember);

teamRouter.delete(
  '/:team_id/members/:member_username',
  teamsController.removeMember
);
teamRouter.delete('/:team_id', teamsController.delete);

module.exports = teamRouter;
