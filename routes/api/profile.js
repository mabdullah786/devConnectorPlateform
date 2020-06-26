const express = require('express');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');

const router = express.Router();

/* 
@route  GET api/profile/me
@desc    Get Profile
@access Private
*/
router.get('/me', auth, async (req, res) => {
  // return res.status(500).json({ error: 'error.message' });
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'avater',
      'name',
    ]);

    if (!profile) return res.status(400).json({ error: 'No profile Found' });

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
@route  Post api/profile/
@desc    Add Profile + Update
@access Private
*/

router.post(
  '/',
  [
    auth,
    [
      // check('handle').exists().withMessage('Hanlde is require'),
      check('skills').exists().withMessage('skills is require'),
      check('status').exists().withMessage('status is require'),
    ],
  ],
  async (req, res) => {

    const errros = validationResult(req);

    if (!errros.isEmpty()) {
      return res.status(400).json({ errors: errros.array() });
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if (req.body.skills) {
      profileFields.skills = req.body.skills.split(',').map((item) => item.trim());
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    const profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then((responce) => res.json(responce));
    } else {
      // Create

      // Check if handle exists
      //  await Profile.findOne({ handle: profileFields.handle })
      //   errors.handle = 'That handle already exists';
      //   res.status(400).json(errors);
      // }

      // Save Profile
      new Profile(profileFields).save().then((profile) => res.json(profile));
    }
  }
);

/* 
@route  Get api/profile/
@desc    Get all profiles
@access Public
*/
router.get('/', async (req, res) => {
  try {
    const list = await Profile.find().populate('user', ['name', 'avatar']);
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/* 
@route  Get api/profile/user/:user_id
@desc    Get Profile by ID
@access Public
*/
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
      'name',
      'avatar',
    ]);

    if (!profile) {
      return res.status(500).json({ msg: 'Profile not found' });
    }

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
@route  delete api/profile/ 
@desc    Delete Posts + Profile + User
@access Private
*/
router.delete('/', auth, async (req, res) => {
  try {
    //@Delete Posts

    await Post.deleteMany({ user: req.user.id });

    //@Delete Profile
    let isDeleted = await Profile.findOneAndRemove({ user: req.user.id });

    if (!isDeleted) throw new Error('REcords already Deleted');

    //Delete User
    isDeleted = await User.findOneAndRemove({ _id: req.user.id });

    if (!isDeleted) throw new Error('REcords already Deleted');

    return res.status(200).json({ msg: 'All User Records Delere' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
@route  PUT api/profile/experience
@desc     Add Experience to Profle
@access Private
*/
router.put(
  '/experience',
  [
    auth,
    [
      check('title').exists().withMessage('title Is Required'),
      check('company').exists().withMessage('company Is Required'),
      check('from', 'from Should be valid').exists().isISO8601().toDate(),
      check('to', 'To Should be valid').toDate(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) throw new Error('Profile not found');

      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current ? req.body.current : false,
        description: req.body.description,
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then((profile) => res.json(profile));
    } catch (error) {
      return res.status(500).json({ msg: errors.message });
    }
  }
);

/* 
@route  Delete api/profile/experience/exp_id
@desc     Delete Experice from Profile
@access Private
*/
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const expIndex = profile.experience.map((item) => item.id).indexOf(req.params.exp_id);

    profile.experience.splice(expIndex, 1);

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/* 
@route  PUT api/profile/education
@desc     Add education to Profle
@access Private
*/
router.put(
  '/education',
  [
    auth,
    [
      check('school').exists().withMessage('school Is Required'),
      check('degree').exists().withMessage('degree Is Required'),
      check('fieldofstudy').exists().withMessage('fieldofstudy Is Required'),
      check('from', 'from Should be valid').exists().isISO8601().toDate(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    try {
      Profile.findOne({ user: req.user.id }).then((profile) => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current ? req.body.current : false,
          description: req.body.description,
        };

        // Add to exp array
        profile.education.unshift(newEdu);

        profile.save().then((profile) => res.json(profile));
      });
    } catch (error) {
      return res.status(500).json({ msg: errors.message });
    }
  }
);

/* 
@route  Delete api/profile/education/exp_id
@desc     Delete Experice from Profile
@access Private
*/
router.delete('/education/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const expIndex = profile.education.map((item) => item.id).indexOf(req.params.exp_id);

    profile.education.splice(expIndex, 1);

    await profile.save();

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/* 
@route  GET api/profile/githun:/user_name
@desc    Get user Repos From Github
@access Private
*/
router.get('/github/:user_name', auth, async (req, res) => {
  // return res.status(500).json({ error: 'error.message' });
  try {
    const url = `https://api.github.com/users/${req.params.user_name}/repo?client_id=${config.get(
      'githubClientId'
    )}&client_secret=${config.get('gitHubClientSecret')}`;

    const option = {
      uri: `https://api.github.com/users/${req.params.user_name}/repos`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(option, (error, responce, body) => {
      if (error) return res.status(400).json({ error: error.message });

      if (responce.statusCode !== 200) {
        return res.status(400).json({ error: 'No Github Profile Found' });
      }
      return res.status(200).json(JSON.parse(body));
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
