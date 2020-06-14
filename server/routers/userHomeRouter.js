const express = require("express");
const path = require("path");
const router = express.Router();
const cookieHandler = require("./../utils/cookieHandler");

const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../../ui/userHome.html"));
});

module.exports = router;
