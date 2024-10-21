import { useEffect, useState } from 'react';
import PostForm from './components/PostForm';
const wait = (time) => new Promise((r) => setTimeout(() => r(), time));

function App() {
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [status, setStatus] = useState('loading'); // eg. loading, error, success

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      // setLoading(true);
      // setError(null);
      setStatus('loading');

      try {
        await wait(3000);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal });
        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();
        setPosts(data);
        setStatus('success');
      } catch (error) {
        // setError(error.message);
        setStatus('error');
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchPosts();

    return () => controller.abort();
  }, []);

  return (
    <>
      <h1>Hello, World!</h1>
      <PostForm setPosts={setPosts} />
      {status === 'loading' && <p>Loading...</p>}

      {status === 'error' && (
        <p>
          Something went wrong. <button>Go back</button>
        </p>
      )}

      {/* {posts.length > 0 && */}
      {status === 'success' &&
        posts.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        ))}
    </>
  );
}

export default App;
