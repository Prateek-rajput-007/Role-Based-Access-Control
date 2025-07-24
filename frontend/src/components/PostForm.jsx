
import { useState } from 'react';
import apiClient from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/LoadingSpinner';

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    if (!title || !content) {
      setError('Title and content are required');
      setIsLoading(false);
      return;
    }

    try {
      await apiClient.post('/posts', { title, content });
      setTitle('');
      setContent('');
      onSubmit();
    } catch (err) {
      console.error('Failed to create post:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <LoadingSpinner className="mb-4" />}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required disabled={isLoading} />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required disabled={isLoading} />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </Button>
    </form>
  );
}

export default PostForm;