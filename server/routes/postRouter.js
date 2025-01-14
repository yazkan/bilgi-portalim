import { Router } from "express";
import {
  setPost,
  getAllPostsByCourseCode,
} from "../controllers/postController.js";

const app = Router();

app.post("/post", (req, res) => {
  console.log("Log: Post request /post");
  setPost(req, res);
});

app.get("/post/:courseCode", (req, res) => {
  console.log("Log: Get request /post/:courseCode");
  getAllPostsByCourseCode(req, res);
});

export default app;
