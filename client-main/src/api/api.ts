import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/',
});

export const fetchPosts = (page: number) => {
  return API.get(`/posts?page=${page}`);
};

export const createPost = (title: string, body: string) => {
  return API.post('/posts', { title, body });
};

export const getPost = (id: number) => {
  return API.get(`/posts/${id}`);
};

export const createComment = (postId: number, content: string) => {
  return API.post(`/posts/${postId}/comments`, { content });
};
