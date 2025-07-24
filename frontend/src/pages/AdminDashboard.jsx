
import { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get('/admin/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleApprove = async (id) => {
    setApprovingId(id);
    try {
      await apiClient.put(`/admin/approve/${id}`);
      setPosts(posts.map((post) => (post.id === id ? { ...post, isApproved: true } : post)));
    } catch (err) {
      console.error('Failed to approve post:', err.response?.data || err.message);
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {isLoading && <LoadingSpinner className="my-4" />}
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              <p className="mt-2">Status: {post.isApproved ? 'Approved' : 'Unapproved'}</p>
              <p className="text-sm text-gray-500">By: {post.user.username}</p>
              {!post.isApproved && (
                <Button
                  className="mt-2"
                  onClick={() => handleApprove(post.id)}
                  disabled={approvingId === post.id}
                >
                  {approvingId === post.id ? 'Approving...' : 'Approve'}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;