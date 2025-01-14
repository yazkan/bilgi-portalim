import connection from "../dbConnection.js";

export const login = (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (result.length === 0) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    res.status(200).json(result);
    console.log(username, "Giriş yaptı!");
  });
};

export const register = (req, res) => {
  const { username, password, name, type } = req.body;
  const query =
    "INSERT INTO users (username, password, name, type) VALUES (?, ?, ?, ?)";

  connection.query(query, [username, password, name, type], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        // Check for duplicate entry error
        res.status(409).json({ error: "Username already exists" }); // 409 Conflict
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
      return;
    }
    res.status(200).json({ message: "User created." });
    console.log(username, "hesabı oluşturuldu!");
  });
};

export const getUserByType = (req, res) => {
  const { type } = req.params;
  const query = "SELECT * FROM users WHERE type = ?";

  connection.query(query, [type], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(result);
  });
};
