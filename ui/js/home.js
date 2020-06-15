$(document).ready(function () {
  console.log("ready called");
  $("[data-bs-tooltip]").tooltip();
  document.getElementById("welcomeText").innerText =
    "Welcome " + getCookie("fullName");
  document.getElementById("dateChooser").value = getDateStr();
  fetchPostsWithDateAndStatus(
    $("#dateChooser").val(),
    document.getElementById("dropdownMenu").innerText
  );
});

function uploadPost(event) {
  document.getElementById("uploadButton").innerText = "uploading...";
  var link = $("#link").val();
  var comment = $("#comment").val();

  //create post ajax request
  $.post(
    "/home/addPost",
    {
      link: link,
      comment: comment,
      date: getDateStr(),
    },
    (data, status) => {
      //handle results callback
      if (data == "OK") {
        // the modal

        $("#uploadModal").modal("hide");
        fetchPostsWithDateAndStatus(
          getDateStr(),
          document.getElementById("dropdownMenu").innerText
        );
        alert("new post added");
      } else {
        alert("post not added : try again");
      }
      document.getElementById("uploadButton").innerText = "upload";
    }
  );
}

function fetchPostsWithDateAndStatus(date, status) {
  //fetches data with given date

  status = status.toLowerCase().trim();

  document.getElementById("refreshButton").innerText = "refreshing...";
  $.get(
    `/home/fetchAllUserPosts?date=${date}&status=${status}`,
    (data, status) => {
      $("#postContainer").empty();
      data = data.reverse();
      data.forEach(addPostToPage);
      document.getElementById("refreshButton").innerText = "Refresh";
      $("#dateChooserModal").modal("hide");
    }
  );
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

function AllDropdownButtonHandler(event) {
  document.getElementById("dropdownMenu").innerText = "loading...";
  fetchPostsWithDateAndStatus($("#dateChooser").val(), "all");
  document.getElementById("dropdownMenu").innerText = "All";
}

function pendingDropdownButtonHandler(event) {
  document.getElementById("dropdownMenu").innerText = "loading...";
  fetchPostsWithDateAndStatus($("#dateChooser").val(), "pending");
  document.getElementById("dropdownMenu").innerText = "Pending";
}

function approvedDropdownButtonHandler(event) {
  document.getElementById("dropdownMenu").innerText = "loading...";
  fetchPostsWithDateAndStatus($("#dateChooser").val(), "approved");
  document.getElementById("dropdownMenu").innerText = "Approved";
}
function rejectedDropdownButtonHandler(event) {
  document.getElementById("dropdownMenu").innerText = "loading...";
  fetchPostsWithDateAndStatus($("#dateChooser").val(), "rejected");
  document.getElementById("dropdownMenu").innerText = "Rejected";
}
function refreshHandler(event) {
  fetchPostsWithDateAndStatus(
    $("#dateChooser").val(),
    document.getElementById("dropdownMenu").innerText
  );
}
function dateChooserHandler(event) {
  fetchPostsWithDateAndStatus(
    $("#dateChooser").val(),
    document.getElementById("dropdownMenu").innerText
  );
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

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
