const db = require('../db/config');
class Project {
  constructor(project) {
    this.id = project.id || null;
    this.team_id = project.team_id;
    this.is_completed = project.is_completed;
    this.name = project.name;
    this.tasks = [];
  }
  static findById = async (id) => {
    try {
      const project = db.oneOrNone(`SELECT * FROM projects WHERE id = $1`, id);
      return new this(project);
    } catch {
        throw new Error('could not find project')
    }
  };
}
