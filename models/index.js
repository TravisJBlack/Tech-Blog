const { User } = require('./User');
const { Blog } = require('./Blog')
const { Comment } = require('./Comment');

User.hasMany(Blog, {
    foreignkey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignkey: 'user_id'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
})

module.exports = { User, Blog, Comment };