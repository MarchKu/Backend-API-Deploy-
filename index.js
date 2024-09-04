import express from "express";
import postRouter from "./api/posts.js";
import authRouter from "./api/auth.js";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("API is working on main route");
});

app.get("/test", (req, res) => {
  res.send("API is working on test route");
});

app.use("/posts", postRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`API is running at port ${port}`);
});
