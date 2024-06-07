const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userdata = require('../seeds/userData.json');
const blogData = require('../seeds/BlogData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

        const user = await User.bulkCreate(userdata, {
            individualHooks: true,
            returning: true,
        });

        await Blog.bulkCreate(blogData);

        

    process.exit(0);
};

seedDatabase();