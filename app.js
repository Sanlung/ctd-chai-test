const express = require("express");
const app = express();
const router = require("./router");

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use("/api/v1/people", router);
app.all("/api/v1/*", (req, res) => {
  res.json({error: "That route is not implemented."});
});

app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports = app;
