const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.url);
  res.send("<h1>Hello</h1>"); //determine the content-type automatically
});
app.post("/register", (req, res) => {
  // res.send("Register working");
  const { username, password } = req.body;
  res.json({
    username,
    password,
  });
});

app.listen(4000, (err) => {
  if (err) {
    console.log("There was a problem", err);
    return;
  }
  console.log("Express listening on port 4000");
});
