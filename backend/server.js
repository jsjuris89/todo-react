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
const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      completed: Boolean,
      text: String,
      id: String,
    },
  ],
});
const Todos = mongoose.model("Todos", todosSchema);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.url);
  res.send("<h1>Hello</h1>");
});
app.post("/register", async (req, res) => {
  // console.log("register user....");
  const { username, password } = req.body;
  // console.log("req.body:", req.body);
  // console.log(`username: ${username} and password: ${password}`);
  const user = await User.findOne({ username }).exec();
  // console.log("user:", user);
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

app.post("/login", async (req, res) => {
  console.log("login user....");
  const { loginUsername, loginPassword } = req.body;
  console.log("req.body:", req.body);
  console.log(
    `loginUsername: ${loginUsername}, loginPassword: ${loginPassword}`
  );
  const user = await User.findOne({ username: loginUsername }).exec();
  console.log("user:", user);
  if (!user || user.password !== loginPassword) {
    res.status(403);
    res.json({
      message: "invalid login",
    });
    return;
  }
  res.json({
    message: "successful login",
  });
});

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  console.log("authorization:", authorization);
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  console.log("username from token:", username);
  const todosItems = req.body;
  // console.log("todosItems:", todosItems);
  const user = await User.findOne({ username }).exec();
  console.log("user - User.findOne({ username }):", user);
  // if (!user || user.password !== password) {
  //   res.status(403);
  //   res.json({
  //     message: "invalid access",
  //   });
  //   return;
  // }
  const todosMongoDb = await Todos.findOne({ userId: user._id }).exec();
  // console.log("await Todos.findOne:", todosMongoDb);
  if (!todosMongoDb) {
    // console.log("!todos block executed");
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todosMongoDb.todos = todosItems;
    // console.log("todosMongoDb now:", todosMongoDb);
    await todosMongoDb.save();
  }
  // res.json(todosItems);
  res.json({ result: "no problems in post /todos" });
});

app.get("/todos", async (req, res) => {
  console.log("get /todos running...");
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  console.log(`username: ${username}, password: ${password}`);
  const user = await User.findOne({ username }).exec();
  console.log("user:", user);
  if (!user || user.password !== password) {
    console.log("validation failed!");
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  try {
    const { todos } = await Todos.findOne({ userId: user._id }).exec();
    console.log("todos ---->", todos);
    res.json(todos);
  } catch {
    console.log("get /todos --- catch block running.....");
    res.json({ error: "can't find any todos from the user in mongodb" });
  }
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  app.listen(5100, (err) => {
    if (err) {
      console.log("There was a problem", err);
      return;
    }
    console.log("Express listening on 5100");
  });
});
