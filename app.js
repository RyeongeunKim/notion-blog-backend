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
  "Notion-Version": "2022-02-22",
};

// Route to fetch database data
app.get("/:database_id", async (req, res) => {
  const { database_id } = req.params;
  const resp = await axios({
    method: "GET",
    url: "https://api.notion.com/v1/databases/" + database_id,
    headers,
  });
  return res.json(resp.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
