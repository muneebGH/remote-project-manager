var PostModel = require("./postModel");

async function addPost(info) {
  var post = {
    link: info.link,
    userName: info.userName,
    fullName: info.fullName,
    comment: info.comment,
  };
  var postModel = new PostModel(post);
  console.log("going to save");
  await postModel.save();
  console.log("saved");
}

async function allPostsOfUser(userName) {
  var error = false;
  var response = await PostModel.find({ userName: userName }, (err, res) => {
    if (err) {
      error = true;
    }
  });
  console.log(`res :${response}`);
  console.log(`err :${error}`);
  return [response, error];
}

module.exports = {
  addPost: addPost,
  allPostsOfUser: allPostsOfUser,
};
