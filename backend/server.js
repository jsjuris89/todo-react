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
  // console.log("todosMongoDb", todosMongoDb);
  if (!todosMongoDb) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todosMongoDb.todos = todosItems;
    await todosMongoDb.save();
  }
  console.log("todos in mongo --->", todosMongoDb.todos);
  res.json(todosMongoDb.todos);
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

app.delete("/todos/:id", async (req, res) => {
  console.log(`delete todos/${req.params.id} running......`);
  const subDocId = req.params.id;
  const { username } = req.body;
  console.log(username);

  const userId = await User.findOne({ username }, "_id", function (err, docs) {
    if (err) {
      console.log("error:", err);
    }
  });
  console.log("userId --->", userId);

  const todosParent = await Todos.findOne(
    { userId: userId },
    function (err, docs) {
      if (err) {
        console.log("error:", err);
      }
    }
  );

  await todosParent.todos.pull(subDocId);

  await todosParent.save(function (err) {
    if (err) {
      console.log("error when saving:", err);
    }
  });
});

app.patch("/todos/:id", async (req, res) => {
  console.log(`patch todos/${req.params.id} running......`);
  // console.log(req.body);

  Todos.find({ "todos._id": req.params.id }).then((result) => {
    console.log("result is --->", result);
    Todos.findById(result[0]._id).then((doc) => {
      const subDoc = doc.todos.id(req.params.id);
      subDoc.set(req.body);
      doc.save();
    });
  });
  // This is same as above then code
  // async function amazing() {
  //   const result = await Todos.find({ "todos._id": req.params.id });
  //   const doc = await Todos.findById(result[0]._id);

  //   const subDoc = doc.todos.id(req.params.id);
  //   subDoc.set(req.body);
  //   await doc.save();
  // }
  // amazing();
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
