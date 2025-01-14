import connection from "../dbConnection.js";

export const getAllAssignments = (req, res) => {
  const query = "SELECT * FROM assignments";

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(result);
  });
};

export const getAssignment = (req, res) => {
  const { assignmentId } = req.params;
  const query = "SELECT * FROM assignments WHERE assignmentId = ?";

  connection.query(query, [assignmentId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }
    res.status(200).json(result);
  });
};

export const getAssignmentByCourse = (req, res) => {
  const { courseCode } = req.params;
  const query = "SELECT * FROM assignments WHERE courseCode = ?";

  connection.query(query, [courseCode], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "Assignment not found" });
      return;
    }
    res.status(200).json(result);
  });
};

export const setAssignment = (req, res) => {
  const { assignmentName, dueDate, courseCode } = req.body;

  function convertDateToISO(dateStr) {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) {
      throw new Error("Invalid date format. Expected DD.MM.YYYY");
    }

    const [day, month, year] = dateStr.split(".");
    return `${year}-${month}-${day}`;
  }

  const query =
    "INSERT INTO assignments (assignmentName, dueDate, courseCode) VALUES (?, ?, ?)";

  connection.query(
    query,
    [assignmentName, convertDateToISO(dueDate), courseCode],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(200).json({ message: "Assignment created successfully" });
    }
  );
};

export const deleteAssignment = (req, res) => {
  const { assignmentId } = req.params;
  console.log(assignmentId);

  const query = "DELETE FROM assignments WHERE assignmentId = ?";

  connection.query(query, [assignmentId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ message: "Assignment deleted successfully" });
  });
};
