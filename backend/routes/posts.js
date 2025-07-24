const express = require('express');
const { getPublicPosts, getMyPosts, createPost, updatePost, deletePost } = require('../controllers/postController');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.get('/', getPublicPosts);
router.get('/my-posts', auth, getMyPosts);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;