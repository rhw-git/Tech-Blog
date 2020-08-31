// ----------- setup the application to connect to the database using Sequelize --------------//
// import the sequlize constructor from the library
const Sequelize = require("sequelize");
// configure environment variables locally with dotenv
require("dotenv").config();
// create connection to our database techblog_db
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: "localhost",
    dialet: "mysql",
    port: "3307"
});

module.exports = sequelize;