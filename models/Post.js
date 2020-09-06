// --------------------- preparing and importing ----------------------//
// require sequlite constructors
const { Model, DataTypes } = require('sequelize');
// require connection from configuration
const sequelize = require('../config/connection');
// ----------------------create User Model --------------------------//
// create our Post model
class Post extends Model {
  static upvote(body, models) {
    // create the vote
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          'id',
          'title',
          'created_at',
          // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
          [
            sequelize.literal(
              '(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)',
            ),
            'vote_count',
          ],
        ],
      });
    });
  }
}
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
