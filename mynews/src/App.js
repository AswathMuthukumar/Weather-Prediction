import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/articles')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = { title, content };

    fetch('http://localhost:5000/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArticle),
    })
      .then(response => response.json())
      .then(data => {
        setArticles([...articles, newArticle]);
        setTitle('');
        setContent('');
      })
      .catch(error => console.error('Error adding article:', error));
  };

  return (
    <div className="App">
      
      <h1>jeeva</h1>
      <img src={logo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Article</button>
      </form>
      <div className="articles">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((article) => (
            <div key={article._id} className="article">
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
