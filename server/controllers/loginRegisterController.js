import connection from "../dbConnection.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const login = (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";

  connection.query(query, [username], async (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.length === 0) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const user = result[0];
    try {
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }

      // Password matches, send user data or token
      console.log(user);

      res.status(200).json({ message: "Login successful", user });
      console.log(username, "logged in!");
    } catch (error) {
      res.status(500).json({ error: "Error validating password" });
    }
  });
};

export const register = async (req, res) => {
  const { username, password, name, type } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query =
      "INSERT INTO users (username, password, name, type) VALUES (?, ?, ?, ?)";
    console.log("111111111111");
    console.log(username, hashedPassword, name, type);

    connection.query(
      query,
      [username, hashedPassword, name, type],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            console.log("222222222222");
            // Check for duplicate entry error
            res.status(409).json({ error: "Username already exists" }); // 409 Conflict
          } else {
            console.log("3333333333333");
            res.status(500).json({ error: "Internal Server Error" });
          }
          return;
        }
        res.status(200).json({ message: "User created." });
        console.log(username, "hesabı oluşturuldu!");
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Error hashing the password" });
  }
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

export const getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  connection.query(query, (err, result) => {
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
