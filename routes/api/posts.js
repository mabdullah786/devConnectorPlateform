const express = require('express');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/profile');
const auth = require('../../middleware/auth');

const router = express.Router();

/* 
@route  Post api/posts
@desc    Add Post 
@access Private
*/
router.post('/', [auth, [check('text', 'Text is Rquires').exists()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const { text } = req.body;

    const newExp = new Post({
      text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const savedContent = await newExp.save();

    res.json(savedContent);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/* 
@route  Get api/posts
@desc    Get All posts
@access Private
*/
router.get('/', auth, async (req, res) => {
  try {
    const list = await Post.find().populate('user', ['name', 'avatar']).sort({ date: -1 });
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/* 
@route  Get api/posts/:id
@desc    Get Post by id
@access Private
*/
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new Error('Post not Found');
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/* 
@route  Delete api/posts/:id
@desc    Delete the Pot
@access Private
*/
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new Error('Post not Found');

    if (post.user.toString() !== req.user.id) {
      throw new Error('You are not Authorized');
    }

    await post.remove();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/* 
@route  Put api/posts/like/:id
@desc    Add Like to Post
@access Private
*/
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new Error('Post not Found');

    if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      throw new Error('You Already like the Post');
    }

    post.likes.unshift({
      user: req.user.id,
    });
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/* 
@route  Put api/posts/unlike/:id
@desc    Add Like to Post
@access Private
*/
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new Error('Post not Found');

    if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
      throw new Error('Post Yet not liked');
    }

    const removeInex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeInex, 1);

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

/* 
@route  Post api/posts/comment/:id
@desc    Add comment to Post 
@access Private
*/
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is Rquires').exists()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const { text } = req.body;

      const newComment = {
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
);

/* 
@route  Delete api/posts/comment/:id/:cmt_id
@desc    Delete comment to Post 
@access Private
*/
router.delete('/comment/:id/:cmt_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    if (!post) throw new Error('Post Not Found');

    const targetComment = post.comments.find(
      (comment) => comment.id.toString() === req.params.cmt_id
    );

    if (!targetComment) throw new Error('Comment Not Found');

    if (targetComment.user.toString() !== req.user.id) throw new Error('User Not Authorized');

    const removeInex = post.comments.map((comment) => comment.user.toString()).indexOf(req.user.id);

    post.comments.splice(removeInex, 1);

    await post.save();

    return res.status(200).json(post.comments);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
