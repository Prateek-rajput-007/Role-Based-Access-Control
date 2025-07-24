const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const adminRoutes = require('./routes/admin');

const app = express();
const prisma = new PrismaClient();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Adjust this to your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});