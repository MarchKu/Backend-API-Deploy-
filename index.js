import express from "express";
import postRouter from "./api/posts.js";
import authRouter from "./api/auth.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://frontend-block-post.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
