const bcrpyt = require("bcryptjs");

function comparePass(userPassword, databasePassword) {
  return bcrpyt.compareSync(userPassword, databasePassword);
}

module.exports = { comparePass };
