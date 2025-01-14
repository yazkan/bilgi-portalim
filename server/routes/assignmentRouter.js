import { Router } from "express";
import {
  getAllAssignments,
  getAssignment,
  setAssignment,
  deleteAssignment,
  getAssignmentByCourse,
} from "../controllers/assignmentController.js";

const app = Router();

app.get("/assignment/:assignmentId", (req, res) => {
  console.log("Log: Get request /assignment/:assignmentId");
  getAssignment(req, res);
});

app.post("/assignment", (req, res) => {
  console.log("Log: Post request /assignment");
  setAssignment(req, res);
});

app.get("/assignment", (req, res) => {
  console.log("Log: Get request /assignment");
  getAllAssignments(req, res);
});

app.get("/assignment/courseCode/:courseCode", (req, res) => {
  console.log("Log: Get request /assignment/courseCode/:courseCode");
  getAssignmentByCourse(req, res);
});

app.delete("/assignment/:assignmentId", (req, res) => {
  console.log("Log: Delete request /assignment/:assignmentId");
  deleteAssignment(req, res);
});

export default app;
