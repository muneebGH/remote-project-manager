const express = require("express");
const path = require("path");
const router = express.Router();
const cookieHandler = require("./../utils/cookieHandler");
const postHandler = require("./../models/postHandler");

const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../../ui/userHome.html"));
});

router.post("/addPost", async (req, res) => {
  var info = {
    link: req.param("link"),
    comment: req.param("comment"),
    userName: req.cookies.userName.toString(),
    fullName: req.cookies.fullName.toString(),
  };
  var error = false;
  try {
    await postHandler.addPost(info);
  } catch (e) {
    error = true;
  }
  if (error) {
    res.sendStatus(401);
  } else {
    res.sendStatus(200);
  }
});

router.get("/fetchAllUserPosts", async (req, res) => {
  console.log("gonna fetch user posts");
  var [result, error] = await postHandler.allPostsOfUser(req.cookies.userName);
  if (error) {
    res.sendStatus(500);
  } else {
    res.send(result);
  }
});
module.exports = router;
