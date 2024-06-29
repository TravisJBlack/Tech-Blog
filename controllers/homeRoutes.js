const router = require('express').Router();
const { Blog, Comment, User } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: User}]
        });

        const blog = blogData.map((blogs) => blogs.get({ plain: true }))
        res.render('homepage', {
            blog,
            logged_in: req.session.logged_in,
            id: req.session.user_id,


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

router.get('/blogs/:id', withAuth, async (req, res) => {
    try {
        const blogData = await User.findByPk( req.session.user_id,{
            include: [{ model: Blog}]
        });

        const blog = blogData.get({ plain: true })
        console.log(blog);
        res.render('dashboard', {
            blog,
            logged_in: req.session.logged_in,
            id: req.session.user_id,

        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/blog/:id', withAuth, async (req, res) => {
    try{
        const singleBlog = await Blog.findByPk(req.params.id, {
            include: [{ model: Comment, model: User}]
        });

        const blog = singleBlog.get({ plain: true});
        
        res.render('singleblog', {
            ...blog,
        logged_in: req.session.logged_in,
        id: req.session.user_id,

    });
    } catch (err) {
        res.status(50).json(err);
    }
});

router.get('/blog/update/:id', withAuth, async (req, res) => {
    try{
        const singleBlog = await Blog.findByPk(req.params.id, {
            include: [{ model: Comment, model: User}]
        });

        const blog = singleBlog.get({ plain: true});
        
        res.render('singleblog', {
            ...blog,
        logged_in: req.session.logged_in,
        id: req.session.user_id,

    });
    } catch (err) {
        res.status(50).json(err);
    }
});

module.exports = router