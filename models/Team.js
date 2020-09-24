const db = require('../db/config');
const User = require('./User');

class Team {
  constructor(team) {
    this.id = team.id || null;
    this.name = team.name;
    this.team_lead = team.team_lead;
  }
  static findById = async (id) => {
    try {
      const team = await db.oneOrNone(
        ` SELECT * FROM teams WHERE id = $1 `,
        id
      );
      return new this(team);
    } catch (error) {
      throw new Error('team not found');
    }
  };
  static getTeamsForUser = async (user_id) => {
    try {
      const teams = await db.manyOrNone(
        `
      SELECT teams.* FROM teams_members JOIN teams ON teams_members.team_id = teams.id
      WHERE teams_members.member_id = $1
      `,
        user_id
      );
      const leadTeams = await db.manyOrNone(
        `
      SELECT * FROM teams WHERE team_lead = $1
      `,
        user_id
      );
      const teamsToSend = teams.map((team) => new this(team));
      const leadTeamsToSend = leadTeams.map((team) => new this(team));
      return { teams: teamsToSend, leadTeams: leadTeamsToSend };
    } catch {
      throw new Error('could not find teams');
    }
  };
  getTeamLead = async () => {
    try {
      const teamLead = await db.oneOrNone(
        `SELECT users.* FROM users JOIN teams ON teams.team_lead = users.id
            WHERE teams.id= $1`,
        this.id
      );
      return new User(teamLead);
    } catch (error) {
      throw new Error('team lead not found');
    }
  };
  getTeamMembers = async () => {
    try {
      const members = await db.manyOrNone(
        `SELECT users.* FROM teams_members JOIN users ON teams_members.member_id = users.id
            WHERE teams_members.team_id = $1`,
        this.id
      );
      return members.map((member) => new User(member));
    } catch (error) {
      throw new Error('no team members found');
    }
  };
  save = async () => {
    try {
      const team = await db.one(
        `
                INSERT INTO teams
                (name, team_lead)
                VALUES ($/name/, $/team_lead/)
                RETURNING *
                `,
        this
      );
      return Object.assign(this, team);
    } catch {
      throw new Error('couldnt save for some reason');
    }
  };
  addMember = (member_id) => {
    try {
      return db.one(
        `INSERT INTO teams_members
        (member_id, team_id)
        VALUES
        ($1, $2)
        RETURNING *`,
        [member_id, this.id]
      );
    } catch {
      throw new Error('couldnt add team member');
    }
  };
  removeMember = (member_id) => {
    try {
      return db.one(
        `DELETE FROM teams_members WHERE team_id = $1 AND member_id = $2
        RETURNING *`,
        [this.id, member_id]
      );
    } catch {
      throw new Error('could not remove team member');
    }
  };
  delete = async () => {
    try {
      await db.manyOrNone(
        `
      DELETE FROM teams_members WHERE team_id = $1
      RETURNING *
      `,
        this.id
      );
      await db.manyOrNone(
        `DELETE FROM projects WHERE team_id = $1 RETURNING *`,
        this.id
      );
      return db.one(`DELETE FROM teams WHERE id = $1 RETURNING *`, this.id);
    } catch {
      throw new Error('Could not delete team');
    }
  };
}

module.exports = Team;
