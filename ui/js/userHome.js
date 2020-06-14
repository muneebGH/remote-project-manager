$(document).ready(function () {
  $("[data-bs-tooltip]").tooltip();
  fetchPosts(null);
});

function uploadPost(event) {
  document.getElementById("uploadButton").innerText = "uploading...";
  var link = $("#link").val();
  var comment = $("#comment").val();

  //create post ajax request
  $.post(
    "/userHome/addPost",
    {
      link: link,
      comment: comment,
    },
    (data, status) => {
      //handle results callback
      if (data == "OK") {
        //close the modal

        $("#uploadModal").modal("hide");
        fetchPosts(null);
        alert("new post added");
      } else {
        alert("post not added : try again");
      }
      document.getElementById("uploadButton").innerText = "upload";
    }
  );
}

function fetchPosts(event) {
  console.log("fetching posts");
  document.getElementById("refreshButton").innerText = "refreshing...";
  $.get("/userHome/fetchAllUserPosts", (data, status) => {
    $("#postContainer").empty();
    data = data.reverse();
    data.forEach(addPostToPage);
    document.getElementById("refreshButton").innerText = "Refresh";
  });
}

function addPostToPage(post, index) {
  var date = new Date(post.date);
  var color;
  if (post.status == "pending") {
    color = "#393e46";
  } else if (post.status == "approved") {
    color = "#17706e";
  } else {
    color = "#d92027";
  }

  $("#postContainer").append(
    renderPostValue(
      color,
      post.status,
      date,
      post.link,
      post.fullName,
      post.userName,
      post.comment
    )
  );
}
