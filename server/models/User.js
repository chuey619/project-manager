const db = require('../db/config');
class User {
  constructor(user) {
    this.id = user.id || null;
    this.username = user.username;
    this.name = user.name;
    this.password_digest = user.password_digest;
  }

  static findByUsername = async (username) => {
    try {
      let user = await db.oneOrNone(
        `SELECT * FROM users where username = $1`,
        username
      );
      return new this(user);
    } catch (error) {
      throw new Error('user not found');
    }
  };
  static findByName = async (name) => {
    try {
      let user = await db.oneOrNone(
        `SELECT * FROM users where name = $1`,
        name
      );
      return new this(user);
    } catch (error) {
      throw new Error('user not found');
    }
  };
  static findByID = async (id) => {
    try {
      let user = await db.oneOrNone(`SELECT * FROM users where id = $1`, id);
      return new this(user);
    } catch (error) {
      throw new Error('user not found');
    }
  };
  save = async () => {
    const user = db.one(
      `
          INSERT INTO users
          (username, email, password_digest)
          VALUES ($/username/, $/name/, $/password_digest/)
          RETURNING *
          `,
      this
    );
    return Object.assign(this, user);
  };
}

// const myFunc = async () => {
//   let user = await User.findByUsername('test');
//   console.log(user);
// };
// myFunc();
module.exports = User;
