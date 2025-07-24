const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { user: { select: { username: true } } },
  });
  res.json(posts);
};

const approvePost = async (req, res) => {
  const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const updatedPost = await prisma.post.update({
    where: { id: parseInt(req.params.id) },
    data: { isApproved: true },
  });
  res.json(updatedPost);
};

module.exports = { getAllPosts, approvePost };