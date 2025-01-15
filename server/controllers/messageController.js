import connection from "../dbConnection.js";

export const getMessages = (req, res) => {
  const { senderId, receiverId } = req.query;
  console.log(req.query);

  const query = `SELECT * FROM messages WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)`;
  connection.query(
    query,
    [senderId, receiverId, receiverId, senderId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "Messages not found" });
        return;
      }
      console.log(result);
      res.status(200).json(result);
    }
  );
};

export const setMessage = (req, res) => {
  const { senderName, senderId, receiverId, content, timestamp } = req.body;
  console.log(req.body);

  const query =
    "INSERT INTO messages (senderName, senderId, receiverId, content, timestamp) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query,
    [senderName, senderId, receiverId, content, timestamp],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(201).json({ message: "Message sent" });
    }
  );
};
