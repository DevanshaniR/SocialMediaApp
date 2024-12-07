import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { usePostContext } from "../context/postContext";

const PostForm = () => {
  const { createPost } = usePostContext();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleSubmit = () => {
    if (title && body) {
      createPost(title, body);
      setTitle("");
      setBody("");
    }
  };

  return (
    <div>
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Body"
        fullWidth
        value={body}
        onChange={(e) => setBody(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
      <Button onClick={handleSubmit} variant="contained">
        Create Post
      </Button>
    </div>
  );
};

export default PostForm;
