const express = require("express");

const router = express.Router();
const axios = require("axios");

require("dotenv").config();

const secretKey = process.env.NOTION_KEY;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${secretKey}`,
  "Notion-Version": "2022-06-28",
};

router.post("/:database_id", async (req, res, next) => {
  try {
    const { database_id } = req.params;
    const response = await axios({
      method: "POST",
      url: `https://api.notion.com/v1/databases/${database_id}/query`,
      headers,
    });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get("/:block_id", async (req, res, next) => {
  try {
    const { block_id } = req.params;
    const response = await axios({
      method: "GET",
      url: `https://api.notion.com/v1/blocks/${block_id}/children?page_size=100`,
      headers,
    });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
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

module.exports = router;
