const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const postsRoutes = require("./routes/posts");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/posts", postsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
