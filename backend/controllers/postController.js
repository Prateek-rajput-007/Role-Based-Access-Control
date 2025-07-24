const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPublicPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { isApproved: true },
    include: { user: { select: { username: true } } },
  });
  res.json(posts);
};

const getMyPosts = async (req, res) => {
  const posts = await prisma.post.findMany({ where: { userId: req.user.id } });
  res.json(posts);
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, userId: req.user.id },
    });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: 'Error creating post' });
  }
};

const updatePost = async (req, res) => {
  const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!post || post.userId !== req.user.id || post.isApproved) {
    return res.status(403).json({ message: 'Cannot edit this post' });
  }
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!post || post.userId !== req.user.id || post.isApproved) {
    return res.status(403).json({ message: 'Cannot delete this post' });
  }
  await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Post deleted' });
};

module.exports = { getPublicPosts, getMyPosts, createPost, updatePost, deletePost };