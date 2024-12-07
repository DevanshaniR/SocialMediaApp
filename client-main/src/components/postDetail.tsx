import { useEffect, useState } from "react";
import { TextField, Button,Card ,CardContent,Box} from "@mui/material";
import { usePostContext } from "../context/postContext";
import { useParams } from "react-router-dom";
import PostCard from "./postCard";

const PostDetail = () => {
  const { post, createComment } = usePostContext();
  const [commentContent, setCommentContent] = useState<string>("");

  const { getPost, currentPage } = usePostContext();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (!post) {
    return null;
  }

  const handleSubmit = () => {
    if (commentContent) {
      createComment(post.id, commentContent);
      setCommentContent("");
    }
  };

  return (
    <Box alignItems={'center'} justifyContent={'center'}>
    <Card
    key={post.id}
    sx={{
      width: 500,
      marginBottom: "20px",
      boxShadow: 3,
      textAlign: "center",
    }}
  >
    <CardContent>
   <PostCard post = {post}/>
      <TextField
        label="Add a comment"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        fullWidth
        multiline
        rows={4}
      />
      <Button onClick={handleSubmit} variant="contained" sx = {{marginTop:'20px'}}>
        Add Comment
      </Button>
      </CardContent>
    </Card>
    </Box>
  );
};

export default PostDetail;
