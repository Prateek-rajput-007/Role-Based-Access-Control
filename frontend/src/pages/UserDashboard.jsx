
import { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';
import PostForm from '@/components/PostForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/LoadingSpinner';

function UserDashboard() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editError, setEditError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get('/posts/my-posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      await apiClient.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error('Failed to delete post:', err.response?.data || err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handlePostSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/posts/my-posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to refresh posts:', err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditError('');
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError('');
    setIsLoading(true);
    if (!editTitle || !editContent) {
      setEditError('Title and content are required');
      setIsLoading(false);
      return;
    }

    try {
      await apiClient.put(`/posts/${editingPost.id}`, { title: editTitle, content: editContent });
      setPosts(posts.map((post) => (post.id === editingPost.id ? { ...post, title: editTitle, content: editContent } : post)));
      setIsModalOpen(false);
      setEditingPost(null);
    } catch (err) {
      console.error('Failed to update post:', err.response?.data || err.message);
      setEditError(err.response?.data?.message || 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <PostForm onSubmit={handlePostSubmit} />
      {isLoading && <LoadingSpinner className="my-4" />}
      <div className="grid gap-4 mt-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              {!post.isApproved && (
                <div className="mt-2 space-x-2">
                  <Button onClick={() => openEditModal(post)} disabled={isDeleting === post.id}>
                    {isDeleting === post.id ? 'Editing...' : 'Edit'}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(post.id)}
                    disabled={isDeleting === post.id}
                  >
                    {isDeleting === post.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              )}
              {post.isApproved && <p className="text-green-500 mt-2">Approved</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            {editError && <p className="text-red-500">{editError}</p>}
            {isLoading && <LoadingSpinner className="mb-4" />}
            <div>
              <Label htmlFor="editTitle">Title</Label>
              <Input
                id="editTitle"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="editContent">Content</Label>
              <Textarea
                id="editContent"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Post'}
              </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserDashboard;