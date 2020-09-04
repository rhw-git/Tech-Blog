// --------------------- preparing and importing ----------------------//
// require sequlite constructors
const { Model, DataTypes } = require('sequelize');
// require connection from configuration
const sequelize = require('../config/connection');
// ----------------------create User Model --------------------------//
// create our Post model
class Post extends Model {}
Post.init(
  // columns of Post table
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  // configuration of Post table
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modeName: 'post',
  },
);

module.exports = Post;
