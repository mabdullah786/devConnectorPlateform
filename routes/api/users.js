const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

/* 
@route  Post api/users
@desc    Register user
@access Public
*/
router.post(
  '/',
  [
    check('name', 'Name is Requied').not().isEmpty(),
    check('email', 'Email Should be Valid').isEmail(),
    check('password', 'Plz Enter password with 6 or more Characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Email Already Exists',
              param: 'email',
            },
          ],
        });
      }

      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('secretKey'),
        { algorithm: 'HS256', expiresIn: 60 * 6770 },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(400).send({
        errors: [
          {
            msg: error.message,
            param: 'app',
          },
        ],
      });
    }
  }
);

module.exports = router;
