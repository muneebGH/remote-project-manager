$(document).ready(function () {
  $("[data-bs-tooltip]").tooltip();
  document.getElementById("dateChooser").value = getDateStr();
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
      date: getDateStr(),
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
  var date = getDateStr();
  console.log("fetching posts" + date);
  document.getElementById("refreshButton").innerText = "refreshing...";
  $.get(`/userHome/fetchAllUserPosts?date=${date}`, (data, status) => {
    $("#postContainer").empty();
    data = data.reverse();
    data.forEach(addPostToPage);
    document.getElementById("refreshButton").innerText = "Refresh";
  });
}

function fetchPostsWithDate(date) {
  console.log("fetching posts" + date);

  $.get(`/userHome/fetchAllUserPosts?date=${date}`, (data, status) => {
    $("#postContainer").empty();
    data = data.reverse();
    data.forEach(addPostToPage);
    $("#dateChooserModal").modal("hide");
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

function dateChooserHandler(event) {
  fetchPostsWithDate($("#dateChooser").val());
}
function getDateStr() {
  var date = new Date();
  var monthStr = "";
  var dateStr = "";
  var month = date.getMonth() + 1;
  if (month < 10) {
    monthStr = "0" + month;
  } else {
    monthStr = month;
  }
  var dateNumber = date.getDate();
  if (dateNumber < 10) {
    dateStr = "0" + dateNumber;
  } else {
    dateStr = dateNumber;
  }
  return date.getFullYear() + "-" + monthStr + "-" + dateStr;
}
