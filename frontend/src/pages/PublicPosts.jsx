
import { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';

function PublicPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Approved Posts</h2>
      {isLoading && <LoadingSpinner className="my-4" />}
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
              <p className="mt-2 text-sm text-gray-500">By: {post.user.username}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PublicPosts;