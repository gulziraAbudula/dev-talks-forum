import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  async function fetchPost() {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) console.error(error);
    else setPost(data);
  }

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });
    if (error) console.error(error);
    else setComments(data);
  }

  async function handleUpvote() {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id)
      .select()
      .single();

    if (!error) setPost(data);
  }

  async function handleDelete() {
    await supabase.from('posts').delete().eq('id', id);
    navigate('/');
  }

  async function submitComment() {
    if (!newComment.trim()) return;
    const { error } = await supabase.from('comments').insert({ post_id: id, content: newComment });
    if (!error) {
      setNewComment('');
      fetchComments();
    }
  }

  if (!post) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
      {post.image_url && (
        <img src={post.image_url} alt="Post" className="rounded max-h-80 object-cover mt-4" />
      )}
      {post.content && <p className="mt-4 text-lg">{post.content}</p>}

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleUpvote}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-semibold transition-all"
        >
          👍 Upvote ({post.upvotes})
        </button>
        <button
          onClick={() => navigate(`/edit/${post.id}`)}
          className="bg-yellow-500 hover:bg-yellow-400 text-white px-5 py-2 rounded-full font-semibold transition-all"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-full font-semibold transition-all"
        >
          🗑️ Delete
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">💬 Comments</h2>
        <div className="space-y-2 mb-4">
          {comments.map((c) => (
            <div key={c.id} className="bg-white rounded-xl px-4 py-3 shadow ring-1 ring-gray-200">
              <p className="text-sm">{c.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(c.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            onClick={submitComment}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-500 transition-all"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
