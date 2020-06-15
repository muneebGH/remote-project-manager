const express = require("express");
const path = require("path");
const router = express.Router();
const userAccessManager = require("./../utils/userAccessValidator");
const cookieHandler = require("./../utils/cookieHandler");
const postHandler = require("./../models/postHandler");

const mongoose = require("mongoose");

router.get("/", (req, res) => {
  if (!userAccessManager.isLoggedIn(req)) {
    res.redirect("/login");
  }
  res.sendFile(path.resolve(__dirname + "/../../ui/home.html"));
});

router.post("/addPost", async (req, res) => {
  if (!userAccessManager.isLoggedIn(req)) {
    res.redirect("/login");
  }
  var info = {
    link: req.param("link"),
    comment: req.param("comment"),
    userName: req.cookies.userName.toString(),
    fullName: req.cookies.fullName.toString(),
    date: req.param("date"),
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
  if (!userAccessManager.isLoggedIn(req)) {
    res.redirect("/login");
  }
  console.log("gonna fetch user posts");
  var [result, error] = await postHandler.allPostsOfUser(
    req.cookies.userName,
    req.param("date"),
    req.param("status"),
    req.cookies.admin
  );
  if (error) {
    res.sendStatus(500);
  } else {
    if (req.cookies.admin == "true") {
      result.isAdmin = true;
    } else {
      result.isAdmin = false;
    }

    res.send(result);
  }
});
module.exports = router;
