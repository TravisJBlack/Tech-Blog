const router = require('express').Router();
const { User, Blog } = require('../../models');

router.get('/', (req, res) => {
    res.render('dashboard');
})

module.exports = router;