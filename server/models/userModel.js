const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fullName: String,
  userName: String,
  email: String,
  password: String,
  admin: Boolean,
  powers: [String],
});

var userModel = mongoose.model("Users", UserSchema);
module.exports = userModel;
