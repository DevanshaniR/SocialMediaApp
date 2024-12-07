import { Router, Request, Response } from 'express';
import { db } from './db';

const router = Router();

router.get("/posts", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.count as string) || 10;
  const offset = (page - 1) * limit;

  db.all("SELECT * FROM posts LIMIT ? OFFSET ?", [limit, offset], (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching posts');
    } else {
      db.get("SELECT COUNT(*) AS count FROM posts", (err, countRow) => {
        if (err) {
          res.status(500).send('Error fetching post count');
        } else {
          const count = (countRow as { count: number }).count;
          res.json({
            posts: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
          });
        }
      });
    }
  });
});

router.get("/posts/:id", (req: Request, res: Response) => {
  const postId = parseInt(req.params.id, 10);

  db.get("SELECT * FROM posts WHERE id = ?", [postId], (err, row) => {
    if (err) {
      return res.status(500).send('Error fetching post');
    }
    if (!row) {
      return res.status(404).send('Post not found');
    }

    // Fetch comments for this post
    db.all("SELECT * FROM comments WHERE post_id = ?", [postId], (err, comments) => {
      if (err) {
        return res.status(500).send('Error fetching comments');
      }

      // Add comments to the post data
      const newRow = {...row, comments}
      res.json(newRow);
    });
  });
});

router.post("/posts", (req: Request, res: Response) => {
  const { title, body }: { title: string; body: string } = req.body;

  db.run("INSERT INTO posts (title, body) VALUES (?, ?)", [title, body], function (err) {
    if (err) {
      res.status(500).send('Error creating post');
    } else {
      const newPost = { id: this.lastID, title, body };
      res.status(201).json(newPost);
    }
  });
});

router.post("/posts/:postId/comments", (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10);
  const { text } = req.body; 


  db.get("SELECT * FROM posts WHERE id = ?", [postId], (err, post) => {
    if (err) {
      return res.status(500).json({ message: "Error checking if post exists" });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    db.run(
      "INSERT INTO comments (post_id, text) VALUES (?, ?)",
      [postId, text],
      function (err) {
        if (err) {
          return res.status(500).json({ message: "Error creating comment" });
        }
        const newComment = {
          id: this.lastID,
          post_id: postId,
          text,
        };
        return res.status(201).json(newComment);
      }
    );
  });
});

export { router };
