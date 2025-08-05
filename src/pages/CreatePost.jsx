import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const { data, error } = await supabase.from('posts').insert([
      {
        title,
        content,
        image_url: imageURL,
      },
    ]);

    if (!error) navigate('/');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="text"
          placeholder="Post Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border rounded px-4 py-2"
          placeholder="Additional Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="url"
          placeholder="Image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-500 transition-all"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
