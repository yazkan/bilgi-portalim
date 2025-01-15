import { Router } from "express";
import { getMessages, setMessage } from "../controllers/messageController.js";

const app = Router();

app.get("/message", (req, res) => {
  console.log("Log: Get request /message");
  getMessages(req, res);
});

app.post("/message", (req, res) => {
  console.log("Log: Post request /message");
  setMessage(req, res);
});

export default app;
