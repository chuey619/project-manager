const projectRouter = require('express').Router({ mergeParams: true });
const projectController = require('../controllers/projectController');

projectRouter.get('/:project_id', projectController.show);
projectRouter.post('/:project_id/tasks', projectController.addTask);
projectRouter.get('/:project_id/messages', projectController.getMessages);
projectRouter.post('/:project_id/messages', projectController.sendMessage);
projectRouter.delete(
  '/:project_id/tasks/:task_id([0-9]+)',
  projectController.removeTask
);
projectRouter.delete(
  '/:project_id/categories/:category',
  projectController.deleteCategory
);
projectRouter.put('/:project_id/tasks/:task_id', projectController.updateTask);
projectRouter.post('/', projectController.create);
projectRouter.delete('/:project_id', projectController.delete);
module.exports = projectRouter;
