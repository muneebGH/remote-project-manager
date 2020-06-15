const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  link: String,
  userName: String,
  fullName: String,
  comment: String,
  date: String,
  status: { type: String, default: "pending" },
});

var postModel = mongoose.model("Post", PostSchema);
module.exports = postModel;
