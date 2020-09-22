const Task = require('../models/Task');
const Project = require('../models/Project');

const projectController = {};

projectController.show = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.project_id);
    await project.setTasks();
    res.json({
      message: 'project found',
      data: {
        project: project,
      },
    });
  } catch (error) {
    next(error);
  }
};

projectController.create = async (req, res, next) => {
  try {
    console.log(req.params);
    const project = new Project({
      name: req.body.name,
      team_id: parseInt(req.params.team_id),
      description: req.body.description,
    });
    const projectToSend = await project.save();
    res.json({
      message: 'project created',
      data: {
        project: projectToSend,
      },
    });
  } catch (error) {
    next(error);
  }
};

projectController.delete = async (req, res, next) => {
  try {
    const project_id = parseInt(req.params.project_id);
    const project = await Project.findById(project_id);
    await project.delete();
    res.json({
      message: 'project deleted',
    });
  } catch (error) {
    next(error);
  }
};

projectController.addTask = async (req, res, next) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      project_id: parseInt(req.params.project_id),
    });
    await task.save();
    res.json({
      message: 'task added',
      data: {
        task: task,
      },
    });
  } catch (error) {
    next(error);
  }
};

projectController.removeTask = async (req, res, next) => {
  try {
    const task_id = parseInt(req.params.task_id);
    const task = await Task.findById(task_id);
    await task.delete();
    res.json({
      message: 'task deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = projectController;
