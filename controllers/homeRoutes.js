const router = require('express').Router();
const { Blog } = require('../models')


router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll();

        const blog = blogData.map((blogs) => blogs.get({ plain: true }))

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
        res.redirect('homepage');
        return;
    }
    res.render('login')
})

router.get('/register', async (req, res) => {
    res.render('register');
});

// router.get("/logout", (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).json({ message: "Logout failed", error: err });
//         }
//         res.redirect("/login");
//     });
// });

module.exports = router