const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

//displays the bloginput page
router.get('/post', async (req, res) => {
    res.render('blogInput', {
        logged_in: req.session.logged_in,
        id: req.session.user_id,
    }
    )
})

//creates a new blog post and assings it to the logged in user
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
});

//adds a comment to the blog that the user is currently looking at 
router.post('/comment', async (req, res) => {
    try {
        const newComment = await Comment.create({
            name: req.session.name,
            comment: req.body.comment,
            blog_id: req.body.blogId,
        });

        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;