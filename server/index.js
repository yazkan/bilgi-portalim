import express from "express";
import cors from "cors";
import loginRegister from "./routes/loginRegisterRouter.js";
import course from "./routes/courseRouter.js";
import assignment from "./routes/assignmentRouter.js";
import post from "./routes/postRouter.js";
//import path, { dirname } from "path";
//import { fileURLToPath } from "url";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(loginRegister);
app.use(course);
app.use(assignment);
app.use(post);

app.listen(3000, () => console.log("Server running on port 3000!"));
