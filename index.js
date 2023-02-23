import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "./db/conn.js";
import User from "./models/userSchema.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", async (req, res) => {
  const { id, name, email, city } = req.body;
  if (!id || !name || !email || !city) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const user = new User({ id, name, email, city });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to register" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const studentsData = await User.find();
    res.status(201).json(studentsData);
  } catch (e) {
    res.status(500).json({ error: "Failed to register" });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const studentData = await User.findOne({ id });
    if (!studentData) {
      console.log("Student not found");
      return res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to register", e });
  }
});

app.put("/user/:id", async (req, res) => {
  const idToUpdate = req.params.id;
  const { id, name, email, city } = req.body;
  try {
    const updatedStudent = await User.findOneAndUpdate(
      { id: idToUpdate },
      { id, name, email, city },
      {
        new: true,
      }
    );
    res.send(updatedStudent);
  } catch (e) {
    res.status(500).json({ error: "Failed to register" });
  }
});

app.delete("/user/:id", async (req, res) => {
  const idToDelete = req.params.id;
  try {
    const deletedStudent = await User.findOneAndDelete({ id: idToDelete });
    res.send(deletedStudent);
  } catch (e) {
    res.status(500).json({ error: "Failed to register" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
