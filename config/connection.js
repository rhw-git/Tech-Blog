// ----------- setup the application to connect to the database using Sequelize --------------//
// import the sequlize constructor from the library
const Sequelize = require('sequelize');
// configure environment variables locally with dotenv
require('dotenv').config();
// create connection to our database techblog_db
let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    },
  );
}

module.exports = sequelize;
