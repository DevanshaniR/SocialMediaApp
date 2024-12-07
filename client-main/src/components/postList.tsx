import React, { useEffect } from "react";
import {
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { usePostContext } from "../context/postContext";
import PostCard from "./postCard";

const PostList: React.FC = () => {
  const { posts, fetchPosts, currentPage, totalPages } = usePostContext();
  const count = 5;

  useEffect(() => {
    fetchPosts(currentPage, count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Link to="/create">
          <Button variant="contained" color="primary">
            Create New Post
          </Button>
        </Link>
      </div>
      <Stack flexDirection={"column"} spacing={2} mt={2} alignItems={"center"}>
        {posts?.map((post) => (
          <Link
            to={`/posts/${post.id}`}
            key={post.id}
            style={{ textDecoration: "none" }}
          >
          <PostCard post = {post}/>
          </Link>
        ))}
      </Stack>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={() => fetchPosts(currentPage - 1, 10)}
        >
          Prev
        </Button>
        <Typography variant="body1" style={{ margin: "0 20px" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          disabled={currentPage === totalPages}
          onClick={() => fetchPosts(currentPage + 1, 10)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PostList;
