const router = require('express').Router();
const { User } = require('../../models/User');

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received registration data:", req.body);

  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(400).json({ message: "User registration failed", error });
  }
});

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
       
        res.json({ user: userData, message: 'You are now logged in!' });
      });
      console.log(req.session.logged_in)
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


module.exports = router;