const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.url);
  res.send("<h1>Hello</h1>"); //determine the content-type automatically
});
app.post("/register", async (req, res) => {
  // res.send("Register working");
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) {
    res.status(500);
    res.json({
      message: "User already exists",
    });
    return;
  }

  await User.create({ username, password });
  res.json({
    message: "success",
  });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  app.listen(4000, (err) => {
    if (err) {
      console.log("There was a problem", err);
      return;
    }
    console.log("Express listening on port 4000");
  });
});
