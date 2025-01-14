import e from "express";
import connection from "../dbConnection.js";

export const getAllCourses = (req, res) => {
  const query = "SELECT * FROM courses";

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(result);
  });
};

export const getCourse = (req, res) => {
  const { courseCode } = req.params;
  const query = "SELECT * FROM courses WHERE courseCode = ?";

  connection.query(query, [courseCode], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    res.status(200).json(result);
  });
};

export const setCourse = (req, res) => {
  const {
    courseCode,
    courseName,
    instructorName,
    instructorUsername,
    enrolledNumber,
    imageUrl,
  } = req.body;

  console.log(
    courseCode,
    courseName,
    instructorName,
    instructorUsername,
    enrolledNumber,
    imageUrl
  );
  const query =
    "INSERT INTO courses (courseCode, courseName, instructorName, instructorUsername, enrolledNumber, imageUrl) VALUES (?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      courseCode,
      courseName,
      instructorName,
      instructorUsername,
      enrolledNumber,
      imageUrl,
    ],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(409).json({ error: "Course already exists" });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
        return;
      }
      res.status(200).json({ message: "Course added." });
    }
  );
};

export const deleteCourse = (req, res) => {
  const { courseCode } = req.params;
  const query = "DELETE FROM courses WHERE courseCode = ?";

  connection.query(query, [courseCode], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ message: "Course deleted." });
  });
};

export const attendCourse = (req, res) => {
  const { courseCode, studentId } = req.body;
  const query =
    "INSERT IGNORE INTO course_attend (courseCode, studentId, attend) VALUES (?, ?, ?)";

  connection.query(query, [courseCode, studentId, 0], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).json({ error: "Already attending" });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
      return;
    }
    res.status(200).json({ message: "Attended course." });
  });
};

export const getAttendedCourses = (req, res) => {
  const { studentId } = req.params;
  const query = "SELECT * FROM course_attend WHERE studentId = ?";

  connection.query(query, [studentId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(result);
  });
};

export const getAttendedStudents = (req, res) => {
  const { courseCode } = req.params;
  const query =
    "SELECT studentId FROM course_attend WHERE courseCode = ? AND attend = 0";

  connection.query(query, [courseCode], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.length === 0) {
      res
        .status(404)
        .json({ message: "No students found for the given course code" });
      return;
    }

    // Extract studentIds from the result
    const studentIds = result.map((row) => row.studentId);

    // Query to fetch student details from the student table
    const studentQuery = `SELECT * FROM users WHERE id IN (?)`;

    connection.query(studentQuery, [studentIds], (err, students) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.status(200).json(students);
    });
  });
};

export const deleteAttendedCourse = (req, res) => {
  const { courseCode, studentId } = req.body;
  const query =
    "DELETE FROM course_attend WHERE courseCode = ? AND studentId = ?";

  connection.query(query, [courseCode, studentId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ message: "Deleted attended course." });
  });
};

export const putAttendedCourse = (req, res) => {
  const { courseCode, studentId, attend } = req.body;

  // Update course_attend table
  const updateAttendQuery =
    "UPDATE course_attend SET attend = ? WHERE courseCode = ? AND studentId = ?";

  connection.query(
    updateAttendQuery,
    [attend, courseCode, studentId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // If the attendance was marked as attended (e.g., `attend = true` or `attend = 1`)
      if (attend == 1) {
        const updateCoursesQuery =
          "UPDATE courses SET enrolledNumber = enrolledNumber + 1 WHERE courseCode = ?";

        connection.query(updateCoursesQuery, [courseCode], (err, result) => {
          if (err) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          res.status(200).json({
            message: "Updated attended course and incremented enrolled number.",
          });
        });
      } else {
        res.status(200).json({ message: "Updated attended course." });
      }
    }
  );
};
