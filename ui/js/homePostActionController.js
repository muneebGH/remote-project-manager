function approveHandler(event) {
  //handler approve button on post
  var postId = getPostId(event);
  $.post(
    "/home/updateStatus",
    { id: postId, newStatus: "approved" },
    (data, status) => {
      //handle result of post request
    }
  );
}

function deleteHandler(event) {
  //handle delete button on post
  var postId = getPostId(event);
  $.post("/home/deletePost", { id: postId }, (data, status) => {
    //handle result of post request
    if (data == "server error") {
      alert(data);
    } else {
      refreshHandler(null);
    }
  });
}

function rejectHandler(event) {
  //handle reject button on post
  var postId = getPostId(event);
  $.post(
    "/home/updateStatus",
    { id: postId, newStatus: "rejected" },
    (data, status) => {
      //handle result of post request
    }
  );
}

function getPostId(e) {
  return e.target.parentElement.parentElement.firstElementChild.value;
}
