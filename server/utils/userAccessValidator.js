function userLoggedIn(request) {
  try {
    if (request.cookies.userName.toLowerCase().trim() != "") {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

module.exports = {
  isLoggedIn: userLoggedIn,
};
