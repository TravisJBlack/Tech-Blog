const router = require('express').Router();
const { Blog } = require('../models')


router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll();

        const blog = blogData.map((blogs) => blogs.get({plain: true}))
       
        res.render('homepage', {
            blog,
      logged_in: req.session.logged_in,

        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.render('homepage');
        return;
    }
    res.render('login')
})

router.get('/register', async (req, res) => {
    res.render('register');
});

module.exports = router