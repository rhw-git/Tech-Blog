// --------------------- preparing and importing ----------------------//
// require sequlite constructors
const { Model, DataTypes } = require('sequelize');
// require connection from configuration
const sequelize = require('../config/connection');
// ----------------------create Vote Model --------------------------//
class Vote extends Model {}

Vote.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  //configuration
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'vote',
  },
);

module.exports = Vote;
