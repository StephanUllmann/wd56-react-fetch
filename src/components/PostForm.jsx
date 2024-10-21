import { useState } from 'react';

const PostForm = ({ setPosts }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      // console.log(res);
      const data = await res.json();
      console.log(data);
      setPosts((prev) => [data, ...prev]);
    } catch (error) {}
  };

  return (
    <div>
      <h2>New Post</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input type='text' name='title' value={formData.title} onChange={handleInput} />
        </label>
        <br />
        <label>
          Post
          <textarea name='body' value={formData.body} onChange={handleInput}></textarea>
        </label>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
