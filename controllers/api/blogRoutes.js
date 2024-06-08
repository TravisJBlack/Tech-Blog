const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: Blog}]
        });

        const comment = commentData.map((comments) => comments.get({plain: true}))
       
        res.render('dashboard', {
            comment
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;