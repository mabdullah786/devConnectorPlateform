const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('config');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

/* 
@route  GET api/aut
@desc    Test route
@access Public
*/
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

/* 
@route  Post api/aut
@desc    Test route
@access Public
*/
router.post(
  '/',
  [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Email is Required')
      .isEmail()
      .withMessage('Email should be Valid'),
    check('password').exists().withMessage('Password is Required'),
  ],
  async (req, res) => {
    const errorResult = validationResult(req);

    if (!errorResult.isEmpty()) {
      return res.status(500).json({ errors: errorResult.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) throw new Error('No User Found');

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new Error('Invalid Credencials');

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('secretKey'),
        { algorithm: 'HS256', expiresIn: 60 * 60 },
        (error, token) => {
          if (error) throw error;

          return res.status(200).json({ token });
        }
      );
    } catch (error) {
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
