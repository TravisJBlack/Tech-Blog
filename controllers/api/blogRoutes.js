const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

router.get('/post', async (req, res) => {
    res.render('blogInput', {
        logged_in: req.session.logged_in,
        id: req.session.user_id,
    }
    )
})

router.post('/post', async (req, res) => {
    try {
        const newPost = await Blog.create({ 
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;