const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userdata = require('../seeds/userData.json');
const blogData = require('../seeds/blogData.json');
const commentData = require('../seeds/commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

        const user = await User.bulkCreate(userdata, {
            individualHooks: true,
            returning: true,
        });

        await Blog.bulkCreate(blogData);

        await Comment.bulkCreate(commentData);
        
    process.exit(0);
};

seedDatabase();