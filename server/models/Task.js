const db = require('../db/config');
class Task {
  constructor(task) {
    this.id = task.id || null;
    this.title = task.title;
    this.project_id = task.project_id;
    this.description = task.description;
    this.completed_by = task.completed_by;
  }
  static findById = async (id) => {
    try {
      const task = await db.oneOrNone(`SELECT * FROM tasks WHERE id = $1`, id);
      return new this(task);
    } catch {
      throw new Error('could not find task');
    }
  };
  save = async () => {
    try {
      let task = await db.one(
        `INSERT INTO tasks 
            (title, project_id, description)
            VALUES
            ($/title/, $/project_id/, $/description/)
            RETURNING *`,
        this
      );
      return Object.assign(this, task);
    } catch {
      throw new Error('could not save task');
    }
  };
  markComplete = async () => {
    try {
      return db.one(
        'UPDATE tasks SET is_completed = true WHERE id = $1',
        this.id
      );
    } catch {
      throw new Error('could not mark as complete');
    }
  };
  delete = async () => {
    try {
      await db.one(`DELETE FROM tasks WHERE id = $1 RETURNING *`, this.id);
    } catch {
      throw new Error('could not delete task');
    }
  };
}
module.exports = Task;
