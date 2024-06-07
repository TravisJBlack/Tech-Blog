const { User } = require('./User');
const { Blog } = require('./Blog')

User.hasMany(Blog, {
    foreignkey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignkey: 'user_id'
});

module.exports = { User, Blog };