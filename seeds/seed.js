const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userdata = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: false });

        const user = await User.bulkCreate(userdata, {
            individualHooks: true,
            returning: true,
        });

        await Blog.bulkCreate(blogData);

        await Comment.bulkCreate(commentData);
        
    process.exit(0);
};

seedDatabase();