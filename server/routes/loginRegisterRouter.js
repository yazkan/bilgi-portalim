import { Router } from "express";
import {
  login,
  register,
  getUserByType,
  getUsers,
} from "../controllers/loginRegisterController.js";

const app = Router();

app.post("/login", (req, res) => {
  console.log("Log: Post request /login");
  login(req, res);
});

app.post("/register", (req, res) => {
  console.log("Log: Post request /register");
  register(req, res);
});

app.get("/user/type/:type", (req, res) => {
  console.log("Log: Get request /user/type/:type");
  getUserByType(req, res);
});

app.get("/users", (req, res) => {
  console.log("Log: Get request /users");
  getUsers(req, res);
});

export default app;
