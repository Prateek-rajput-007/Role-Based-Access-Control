const express = require('express');
const { getAllPosts, approvePost } = require('../controllers/adminController');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/posts', auth, adminAuth, getAllPosts);
router.put('/approve/:id', auth, adminAuth, approvePost);

module.exports = router;