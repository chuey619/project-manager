const Team = require('../models/Team');
const User = require('../models/User');
const Project = require('../models/Project');

const teamsController = {};

teamsController.index = async (req, res, next) => {
  try {
    const teams = await Team.getTeamsForUser(req.user.id);
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
    const team_id = parseInt(req.params.team_id);
    const team = await Team.findById(team_id);
    const members = await team.getTeamMembers();
    const projects = await Project.getAllForTeam(req.params.team_id);

    console.log(projects);
    res.json({
      message: 'team found',
      data: {
        team: team,
        projects: projects,
        members: members,
      },
    });
  } catch (error) {
    next(error);
  }
};

teamsController.create = async (req, res, next) => {
  try {
    const team = new Team({
      name: req.body.name,
      team_lead: req.user.id,
    });
    await team.save();
    res.json({
      message: 'team created',
      data: { team: team },
    });
  } catch (error) {
    next(error);
  }
};

teamsController.removeMember = async (req, res, next) => {
  try {
    const username = req.params.member_username.replace('%', ' ');
    const team_id = parseInt(req.params.team_id);
    console.log(team_id, req.params.team_id);
    const team = await Team.findById(team_id);
    const user = await User.findByUsername(username);
    if (req.user.id === team.team_lead || req.user.id === user.id) {
      await team.removeMember(user.id);
      res.json({
        message: 'member removed',
      });
    } else {
      res.json({
        error: 'only the team lead can remove members',
      });
    }
  } catch (error) {
    next(error);
  }
};

teamsController.addMember = async (req, res, next) => {
  try {
    const team_id = parseInt(req.params.team_id);
    const team = await Team.findById(team_id);
    console.log(req.body);
    const member = await User.findByUsername(req.body.member);
    console.log(member);
    if (req.user.id === team.team_lead) {
      team.addMember(member.id);
      res.json({
        message: 'member added',
      });
    } else {
      res.json({
        error: 'only the team lead can add members',
      });
    }
  } catch (error) {
    next(error);
  }
};

teamsController.delete = async (req, res, next) => {
  try {
    const team_id = parseInt(req.params.team_id);
    const team = await Team.findById(team_id);
    await team.delete();
    res.json({
      message: 'team deleted!',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = teamsController;
