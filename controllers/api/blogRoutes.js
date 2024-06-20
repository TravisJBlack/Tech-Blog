const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: Comment}]
        });

        const blog = blogData.map((blogs) => blogs.get({plain: true}))

        res.render('dashboard', {
            blog,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post', async (req, res) => {
    res.render('blogInput')
})

router.post('/post', async (req, res) => {
    try {
        const newPost = await Blog.create({ ...req.body });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;