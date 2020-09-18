require("dotenv").config();
const options = {
  query: (e) => {
    console.log(e.query);
  },
};

const pgp = require("pg-promise")(options);

function setDatabase() {
  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    return pgp({
      database: "project_manager",
      port: 5432,
      host: "localhost",
      user: "postgres",
      password: process.env.PASSWORD,
    });
  } else if (process.env.NODE_ENV === "production") {
    return pgp(process.env.DATABASE_URL);
  }
}

module.exports = setDatabase();
