import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', image_url: '' });

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (!error && data) setPost(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase
      .from('posts')
      .update({
        title: post.title,
        content: post.content,
        image_url: post.image_url
      })
      .eq('id', id);
    if (!error) navigate(`/posts/${id}`);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <textarea
          className="w-full border rounded px-4 py-2"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          rows={5}
        />
        <input
          type="url"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={post.image_url}
          onChange={(e) => setPost({ ...post, image_url: e.target.value })}
        />
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
