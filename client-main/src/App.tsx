import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostProvider } from './context/postContext';
import PostList from './components/postList';
import PostForm from './forms/createPost';
import PostDetail from './components/postDetail';

const App: React.FC = () => {
  return (
    <PostProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </PostProvider>
  );
};

export default App;
