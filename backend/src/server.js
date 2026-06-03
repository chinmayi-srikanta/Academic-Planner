import express from "express";
import cors from "cors";

import subjectRoutes from "./routes/subjectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/subjects", subjectRoutes);
app.use("/tasks", taskRoutes);
app.use("/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});