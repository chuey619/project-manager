const Team = require('../models/Team');
const User = require('../models/User');
const Project = require('../models/Project');
const teamsController = {};

teamsController.index = async (req, res, next) => {
  try {
    const user = await User.findByID(req.user.id);
    const teams = await user.getTeams();
    res.json({
      message: 'ok',
      data: {
        teams: teams,
      },
    });
  } catch (error) {
    next(error);
  }
};
teamsController.show = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    const projects = await Project.getAllForTeam(team.id);
    res.json({
      message: 'ok',
      data: {
        team: team,
        projects: projects,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = teamsController;
