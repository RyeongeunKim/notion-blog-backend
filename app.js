// form-tool-backend/app.js

const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3002;
require("dotenv").config();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

const secretKey = process.env.NOTION_KEY;

// What we'll pass into axios
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${secretKey}`,
  "Notion-Version": "2022-06-28",
};

// Route to fetch database data
app.post("/:database_id", async (req, res) => {
  const { database_id } = req.params;
  const response = await axios({
    method: "POST",
    url: `https://api.notion.com/v1/databases/${database_id}/query`,
    headers,
  });
  console.log(response);
  return res.json(response.data);
});

// Route to fetch pages data
// app.post("/:page_id", async (req, res) => {
//   const { page_id } = req.params;
//   const response = await axios({
//     method: "POST",
//     url: "https://api.notion.com/v1/pages/" + page_id,
//     headers,
//   });
//   return res.json(response.data);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
