const Task = require('../models/Task');
const Project = require('../models/Project');
const Message = require('../models/Message');
const User = require('../models/User');
const Team = require('../models/Team');
const projectController = {};

projectController.show = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.project_id);
    await project.setTasks();
    let lanes = {};
    project.tasks.forEach((task) => (lanes[task.category] = 1));
    let lanesToSend = Object.keys(lanes).map((lane, i) => {
      return {
        id: lane,
        title: lane,
        cards: project.tasks
          .map((task) => {
            if (task.category === lane) {
              return {
                id: task.id,
                description: task.description,
                title: task.title,
                draggable: true,
              };
            } else {
              return null;
            }
          })
          .filter((el) => el !== null),
      };
    });

    res.json({
      data: { lanes: lanesToSend },
    });
  } catch (error) {
    next(error);
  }
};

projectController.create = async (req, res, next) => {
  try {
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
    const team_id = parseInt(req.params.team_id);
    const team = await Team.findById(team_id);
    const project = await Project.findById(project_id);
    if (req.user.id === team.team_lead) {
      await project.delete();
      res.json({
        message: 'project deleted',
      });
    } else {
      res.json({
        message: 'Only the team lead can delete a project',
      });
    }
  } catch (error) {
    next(error);
  }
};

projectController.addTask = async (req, res, next) => {
  try {
    console.log(req.body);
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      project_id: parseInt(req.params.project_id),
      category: req.body.category,
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

projectController.updateTask = async (req, res, next) => {
  try {
    const task_id = parseInt(req.params.task_id);
    const task = await Task.findById(task_id);
    await task.updateCategory(req.body.category);
    res.json({
      message: 'category updated',
    });
  } catch (error) {
    next(error);
  }
};

projectController.deleteCategory = async (req, res, next) => {
  try {
    const category = req.params.category.toString().replace('%', ' ');

    const project_id = parseInt(req.params.project_id);
    await Task.deleteByCategory(project_id, category);
    res.json({
      message: 'category deleted',
    });
  } catch (error) {
    next(error);
  }
};
projectController.getMessages = async (req, res, next) => {
  try {
    const project_id = parseInt(req.params.project_id);
    const messages = await Message.getAllForProject(project_id);

    res.json({
      message: 'ok',
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
projectController.sendMessage = async (req, res, next) => {
  try {
    const project_id = parseInt(req.params.project_id);
    const message = new Message({
      body: req.body.message,
      sender_id: req.user.id,
      project_id: project_id,
      sender: req.user.name,
    });
    await message.save();

    res.json({
      message: 'ok',
      data: { message },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = projectController;
