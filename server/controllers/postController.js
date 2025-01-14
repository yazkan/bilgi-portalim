import connection from "../dbConnection.js";

export const setPost = (req, res) => {
  const { courseCode, name, content, date } = req.body;
  console.log(courseCode, name, content, date);

  function convertDateToISO(dateStr) {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) {
      throw new Error("Invalid date format. Expected DD.MM.YYYY");
    }

    const [day, month, year] = dateStr.split(".");
    return `${year}-${month}-${day}`;
  }

  const query =
    "INSERT INTO posts (courseCode, name, content, date) VALUES (?, ?, ?, ?)";

  connection.query(
    query,
    [courseCode, name, content, convertDateToISO(date)],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(201).json({ message: "Post created" });
    }
  );
};

export const getAllPostsByCourseCode = (req, res) => {
  const { courseCode } = req.params;
  const query = "SELECT * FROM posts WHERE courseCode = ?";

  connection.query(query, [courseCode], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "Posts not found" });
      return;
    }
    res.status(200).json(result);
  });
};
