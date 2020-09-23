const db = require('../db/config');
const Task = require('./Task');
class Project {
  constructor(project) {
    this.id = project.id || null;
    this.team_id = project.team_id;
    this.is_completed = project.is_completed;
    this.name = project.name;
    this.description = project.description;
    this.tasks = [];
  }
  static findById = async (id) => {
    try {
      const project = await db.oneOrNone(
        `SELECT * FROM projects WHERE id = $1`,
        id
      );

      return new this(project);
    } catch {
      throw new Error('could not find project');
    }
  };
  static getAllForTeam = async (team_id) => {
    try {
      const projects = await db.manyOrNone(
        `SELECT * FROM projects WHERE team_id = $1`,
        team_id
      );
      return projects.map((project) => new this(project));
    } catch {
      throw new Error('could not find projects');
    }
  };
  setTasks = async () => {
    try {
      const tasks = await db.manyOrNone(
        `SELECT * FROM tasks WHERE project_id = $1`,
        this.id
      );
      tasks.forEach((task) => {
        this.tasks.push(new Task(task));
      });
      return this;
    } catch {
      throw new Error('could not set tasks');
    }
  };
  delete = async () => {
    // try {
    await db.manyOrNone(
      `DELETE FROM tasks WHERE project_id = $1 RETURNING *`,
      this.id
    );
    await db.one(`DELETE FROM projects WHERE id = $1 RETURNING *`, this.id);
    // } catch (error) {
    //   throw new Error('could not delete project');
    // }
  };
  save = async () => {
    try {
      const project = db.one(
        `
                  INSERT INTO projects
                  (name, team_id, description)
                  VALUES ($/name/, $/team_id/, $/description/)
                  RETURNING *
                  `,
        this
      );
      return Object.assign(this, project);
    } catch {
      throw new Error('couldnt save for some reason');
    }
  };
}

module.exports = Project;
