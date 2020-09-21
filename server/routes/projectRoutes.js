const projectRouter = require('express').Router({ mergeParams: true });
const projectController = require('../controllers/projectController');

projectRouter.get('/:project_id', projectController.show);
projectRouter.post('/:project_id/tasks', projectController.addTask);
projectRouter.delete(
  '/:project_id/tasks/:task_id',
  projectController.removeTask
);
projectRouter.post('/', projectController.create);
projectRouter.delete('/:project_id', projectController.delete);
module.exports = projectRouter;
