const db = require('../db/config');
class Message {
  constructor(message) {
    this.id = message.id || null;
    this.body = message.body;
    this.sender_id = message.sender_id;
    this.project_id = message.project_id;
    this.sender = message.sender;
  }
  static getAllForProject = async (project_id) => {
    try {
      const messages = await db.manyOrNone(
        `SELECT * FROM messages WHERE project_id = $1 ORDER BY id ASC`,
        project_id
      );
      return messages.map((message) => new this(message));
    } catch {
      throw new Error('could not find messages');
    }
  };
  save = async () => {
    try {
      const message = await db.one(
        `INSERT INTO messages
        (body, sender_id, project_id, sender)
        VALUES
        ($/body/, $/sender_id/, $/project_id/, $/sender/)
        RETURNING *`,
        this
      );
      return Object.assign(this, message);
    } catch {
      throw new Error('could not save message');
    }
  };
}

module.exports = Message;
