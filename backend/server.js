const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(req.url);
  res.send("<h1>Hello</h1>"); //determine the content-type automatically
});

app.listen(4000, (err) => {
  if (err) {
    console.log("There was a problem", err);
    return;
  }
  console.log("Express listening on port 4000");
});
