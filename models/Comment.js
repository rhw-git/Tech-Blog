// --------------------- preparing and importing ----------------------//
// require sequlite constructors
const { Model, DataTypes } = require('sequelize');
// require connection from configuration
const sequelize = require('../config/connection');
// ----------------------create Comment Model --------------------------//
class Comment extends Model {}
Comment.init(
  // define columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  // configuration of comment table
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modeName: 'comment',
  },
);

module.exports = Comment;
