const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//require user model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public (token not necessary)
router.post(
  '/',
  [
    check('name', 'Name is required.')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar

      const avatar = gravatar.url(email, {
        s: '200', // default size
        r: 'pg', // rating: no porn
        d: 'mm' // mm stands for a default image, user will always have some avatar
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password

      const salt = await bcrypt.genSalt(10);

      // creates hashed password with the salt
      user.password = await bcrypt.hash(password, salt);

      // save user to db
      await user.save();

      // Return jsonwebtoken
      res.send('User registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
