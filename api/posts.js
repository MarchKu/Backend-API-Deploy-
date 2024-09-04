import { Router } from "express";
import connectionPool from "../utils/db.js";

const postRouter = Router();


postRouter.get("/", async (req, res) => {
  const posts = await connectionPool.query(
    `select * from posts inner join users on posts.user_id = users.id`
  );
  return res.status(200).json(posts.rows);
});

postRouter.get("/:id", async (req, res) => {
  const postId = req.params.id;
  const post = await connectionPool.query(
    `select * from posts inner join users on posts.user_id = users.id where post_id = $1`,
    [postId]
  );
  return res.status(200).json(post.rows);
});

postRouter.post("/", async (req, res) => {
  const newPost = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  };
  await connectionPool.query(
    `insert into posts (
    post_title,
    post_content,
    created_at,
    updated_at,
    post_likes,
    user_id
    ) values ($1,$2,$3,$4,$5,$6)`,
    [
      newPost.title,
      newPost.content,
      newPost.created_at,
      newPost.updated_at,
      newPost.likes,
      newPost.user_id,
    ]
  );

  return res.status(200).json({ message: "Create post successfully" });
});

postRouter.put("/:id", async (req, res) => {
  const updatedPost = {
    ...req.body,
    updated_at: new Date(),
  };
  const postId = req.params.id;
  await connectionPool.query(
    `update posts set
  post_title = $1,
  post_content = $2,
  updated_at = $3
  where post_id = $4`,
    [updatedPost.title, updatedPost.content, updatedPost.updated_at, postId]
  );
  return res.status(201).json({ message: "Post update succesfully." });
});

postRouter.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  await connectionPool.query(`delete from posts where post_id = $1`, [postId]);
  return res.json({
    message: `Post has been deleted.`,
  });
});

export default postRouter;
