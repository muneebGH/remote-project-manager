function saveUserCookies(res, user) {
  var user = user[0];

  try {
    res.cookie("userName", user.userName);
  } catch (e) {}
  try {
    res.cookie("fullName", user.fullName);
  } catch (e) {}
  try {
    res.cookie("email", user.email);
  } catch (e) {}
  try {
    res.cookie("admin", user.admin);
  } catch (e) {}
  try {
    res.cookie("powers", user.powers);
  } catch (e) {}

  console.log("set cookies");
}

function clearUserCookies(res) {
  try {
    res.clearCookie("userName");
  } catch (e) {
    console.log(e);
  }
  try {
    res.clearCookie("fullName");
  } catch (e) {}
  try {
    res.clearCookie("email");
  } catch (e) {}
  try {
    res.clearCookie("powers");
  } catch (e) {}
  try {
    res.clearCookie("admin");
  } catch (e) {}

  console.log("cookies cleared");
}

module.exports = {
  saveUserCookies: saveUserCookies,
  clearUserCookies: clearUserCookies,
};
