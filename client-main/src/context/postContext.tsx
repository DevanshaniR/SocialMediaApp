import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";

interface Comment {
  id: number;
  content: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}

interface PostContextType {
  posts: Post[];
  post: Post | null;
  totalPages: number;
  currentPage: number;
  fetchPosts: (page: number, count: number) => void;
  getPost: (id: string | undefined) => void;
  createPost: (title: string, body: string) => void;
  createComment: (postId: number, content: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchPosts = (page: number, count: number) => {
    axios
      .get(`http://localhost:5000/posts?page=${page}&count=${count}`)
      .then((response) => {
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setCurrentPage(page);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const getPost = (id: string|undefined) => {
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post:", error));
  };

  const createPost = (title: string, body: string) => {
    axios
      .post("http://localhost:5000/posts", { title, body })
      .then((response) => {
        setPosts((prevPosts) => [...prevPosts, response.data]);
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  const createComment = (postId: number, text: string) => {
    axios
      .post(`http://localhost:5000/posts/${postId}/comments`, { text })
      .then((response) => {
        if (post) {
          setPost({
            ...post,
            comments: [...post.comments, response.data],
          });
        }
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        post,
        totalPages,
        currentPage,
        fetchPosts,
        getPost,
        createPost,
        createComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = (): PostContextType => {
  const context = React.useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
