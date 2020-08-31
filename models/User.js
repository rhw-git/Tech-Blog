// --------------------- preparing and importing ----------------------//
// require bcrypt for hashing password
const bcrypt = require('bcrypt');
// require sequlite constructors
const { Model, DataTypes } = require('sequelize');
// require connection from configuration
const sequelize = require('../config/connection');
// ----------------------create User Model --------------------------//
class User extends Model {}
// define table columns
User.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // at least 4 character for password
        len: [4],
      },
    },
  },
  // configuration
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" funcitonality
      async beforeUpdate(updataUserData) {
        updataUserData.password = await bcrypt.hash(
          updataUserData.password,
          10,
        );
        return updataUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  },
);

module.exports = User;
