import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  async function fetchPosts() {
    let { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(sortBy, { ascending: false });

    if (error) console.error(error);
    else setPosts(data);
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Wrapper for Dev Talks header and Create Post button */}
      <div className="header-wrapper">
        {/* Dev Talks Header */}
        <h1 className="header">Dev Talks</h1>

        {/* Create Post Button */}
        <Link to="/create" className="create-post-btn">
          Create Post
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 rounded border"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded border"
        >
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Link
            to={`/posts/${post.id}`}
            key={post.id}
            className="block bg-white rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md transition-all p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(post.created_at).toLocaleString()}
            </p>
            <p className="text-sm font-medium text-blue-700 mt-2">
              👍 {post.upvotes} upvotes
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
