var PostModel = require("./postModel");

async function addPost(info) {
  var post = {
    link: info.link,
    userName: info.userName,
    fullName: info.fullName,
    comment: info.comment,
    date: info.date,
  };
  var postModel = new PostModel(post);
  console.log("going to save");
  await postModel.save();
  console.log("saved");
}

async function allPostsOfUser(userName, userDate, status, isAdmin) {
  var queryObj = { date: userDate };
  if (isAdmin == "false") {
    //if logged in user is admin the to get all result skip usernmae

    queryObj.userName = userName;
  }

  if (status != "all") {
    //if all status resulsts then skip status
    queryObj.status = status;
  }

  var error = false;
  var response = await PostModel.find(queryObj, (err, res) => {
    if (err) {
      error = true;
    }
  });

  return [response, error];
}

async function deletePost(id) {
  var error = false;
  var response = await PostModel.findByIdAndRemove(id, (err, result) => {
    if (err) {
      error = true;
    }
  });
  return [response, error];
}
async function updatePostStatus(id, newStatus) {
  var error = false;
  var response = await PostModel.findByIdAndUpdate(
    id,
    { status: newStatus },
    (err, result) => {
      if (err) {
        error = true;
      }
    }
  );
  return [response, error];
}
module.exports = {
  addPost: addPost,
  allPostsOfUser: allPostsOfUser,
  deletePost: deletePost,
  updatePostStatus: updatePostStatus,
};
