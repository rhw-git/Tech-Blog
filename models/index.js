// collecting all table's models
const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
//--------------------association between tables -----------------------------//
// Post to User
// Post belongsTo User
Post.belongsTo(User, {
  foreignKey: 'user_id',
});
// User have many Post
User.hasMany(Post, {
  foreignKey: 'user_id',
});
// Post belongsToMany User through vote
Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_post',
  foreignKey: 'post_id',
});
// User belongsToMany Post through vote
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_post',
  foreignkey: 'user_id',
});
// Vote to User
// Vote belong to User
Vote.belongsTo(User, {
  foreignKey: 'user_id',
});
// User have many Vote
User.hasMany(Vote, {
  foreignKey: 'user_id',
});
// Vote to Post
// Vote belongs to Post
Vote.belongsTo(Post, {
  foreignKey: 'post_id',
});
// Post has many Vote
Post.hasMany(Vote, {
  foreignKey: 'post_id',
});

// deconstruct and export all models
module.exports = { User, Post, Vote };
