const db = require('../db/config');
class Task {
  constructor(task) {
    this.id = task.id || null;
    this.title = task.title;
    this.project_id = task.project_id;
    this.category = task.category;
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
            (title, project_id, description, category)
            VALUES
            ($/title/, $/project_id/, $/description/, $/category/)
            RETURNING *`,
        this
      );
      return Object.assign(this, task);
    } catch {
      throw new Error('could not save task');
    }
  };

  updateCategory = async (category) => {
    try {
      return db.one(
        'UPDATE tasks SET category = $1 WHERE id = $2 RETURNING *',
        [category, this.id]
      );
    } catch {
      throw new Error('could not update category');
    }
  };
  updateTitle = async (title) => {
    try {
      return db.one('UPDATE tasks SET title = $1 WHERE id = $2', [
        title,
        this.id,
      ]);
    } catch {
      throw new Error('could not update category');
    }
  };
  updateDescription = async (description) => {
    try {
      return db.one('UPDATE tasks SET description = $1 WHERE id = $2', [
        description,
        this.id,
      ]);
    } catch {
      throw new Error('could not update category');
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
