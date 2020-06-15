const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const DBManager = require("./server/models/DBConnectionManager");
//require("dotenv").config();

var app = express();

//midlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "ui")));
app.use(cookieParser());

//routers

app.use("/", require("./server/routers/userRouter"));
app.use("/home", require("./server/routers/homeRouter"));

//server start listening
const port = process.env.PORT || 5000;
app.listen(port, async () => {
  console.log(`server started at port ${port}`);
  await DBManager.establishConnection();
});
