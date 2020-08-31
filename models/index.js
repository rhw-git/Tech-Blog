// collecting all table's models
const User = require('./User');
const Post = require('./Post');

// Post belongsTo User
Post.belongsTo(User, {
  foreignKey: 'user_id',
});
// User have many Post
User.hasMany(Post, {
  foreignKey: 'user_id',
});

// deconstruct and export all models
module.exports = { User, Post };
