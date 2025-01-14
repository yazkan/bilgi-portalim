import { Router } from "express";
import {
  getAllCourses,
  getCourse,
  setCourse,
  deleteCourse,
  attendCourse,
  getAttendedCourses,
  getAttendedStudents,
  deleteAttendedCourse,
  putAttendedCourse,
} from "../controllers/courseController.js";

const app = Router();

app.get("/course/:courseCode", (req, res) => {
  console.log("Log: Get request /course/:courseCode");
  getCourse(req, res);
});

app.post("/course", (req, res) => {
  console.log("Log: Post request /course");
  setCourse(req, res);
});

app.get("/course", (req, res) => {
  console.log("Log: Get request /courses");
  getAllCourses(req, res);
});

app.delete("/course/:courseCode", (req, res) => {
  console.log("Log: Delete request /course/:courseCode");
  deleteCourse(req, res);
});

app.post("/course/attend", (req, res) => {
  console.log("Log: Post request /course/attend");
  attendCourse(req, res);
});

app.get("/course/attend/:studentId", (req, res) => {
  console.log("Log: Get request /course/attend/:studentId");
  getAttendedCourses(req, res);
});

app.get("/course/attendedStudents/:courseCode", (req, res) => {
  console.log("Log: Get request /course/attendedStudents/:courseCode");
  getAttendedStudents(req, res);
});

app.post("/course/attendDelete", (req, res) => {
  console.log("Log: Delete request /course/attendDelete");
  deleteAttendedCourse(req, res);
});

app.put("/course/attend", (req, res) => {
  console.log("Log: Put request /course/attend");
  putAttendedCourse(req, res);
});

export default app;
