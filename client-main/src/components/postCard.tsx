import { Post } from "../context/postContext";
import { Card, CardContent, Typography, Divider } from "@mui/material";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card
      key={post.id}
      sx={{
        width: 400,
        marginBottom: "20px",
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {post.body}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" gutterBottom textAlign={"right"}>
          Comments:
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
