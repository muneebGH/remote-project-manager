const express = require("express");
const path = require("path");
const router = express.Router();
const cookieHandler = require("./../utils/cookieHandler");
const userAccessManager = require("./../utils/userAccessValidator");

const mongoose = require("mongoose");
const userHandler = require("./../models/userHandler");

router.get("/", (req, res) => {
  if (!userAccessManager.isLoggedIn(req)) {
    res.redirect("/login");
  }
  res.sendFile(path.resolve(__dirname + "/../../ui/test.html"));
});
router.get("/signup", (req, res) => {
  // if (!userAccessManager.isLoggedIn(req)) {
  //   res.redirect("/login");
  // }
  res.sendFile(path.resolve(__dirname + "/../../ui/signup.html"));
});
router.post("/createUser", async (req, res) => {
  console.log(req.params);
  try {
    await userHandler.addUser(req.body);
  } catch (e) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.get("/login", (req, res) => {
  cookieHandler.clearUserCookies(res);
  res.sendFile(path.resolve(__dirname + "/../../ui/login.html"));
});

router.get("/validateUser", async (req, res) => {
  //call db handler func
  var [result, error] = await userHandler.findUser(
    req.param("email"),
    req.param("password")
  );
  //if error
  if (error) {
    res.send("error");
  }
  //if result
  //save cookies
  if (result[0] != null) {
    cookieHandler.saveUserCookies(res, result);
    console.log("/userHome");
    res.send("/userHome");
  } else {
    res.send("not");
  }
});

router.get("/cookies", (req, res) => {
  console.log(req.cookies);
});

router.get("/logout", (req, res) => {
  cookieHandler.clearUserCookies(res);
  res.redirect("/login");
});
module.exports = router;
