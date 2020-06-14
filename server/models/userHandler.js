var userModel = require("./userModel");
async function addUser(user) {
  //checking and marking user as admin
  try {
    if (user.admin == "true") {
      user.admin = true;
    } else {
      user.admin = false;
    }
  } catch (e) {
    user.admin = false;
  }
  //converting powers string to array of strings
  user.powers = user.powers.split(",");
  //making every string in array lowercase and triming
  user.powers = user.powers.map((val) => {
    return val.toLowerCase().trim();
  });
  var user = new userModel(user);

  console.log("going to save user");
  await user.save();
  console.log("saved");
}

async function findUser(email, pass) {
  var error = false;
  console.log(`find user email: ${email} and pass : ${pass}`);
  var response = await userModel.find(
    { email: email, password: pass },
    (err, res) => {
      if (err) {
        error = true;
      }
    }
  );
  console.log(`res :${response}`);
  console.log(`err :${error}`);
  return [response, error];
}

module.exports = {
  addUser: addUser,
  findUser: findUser,
};
