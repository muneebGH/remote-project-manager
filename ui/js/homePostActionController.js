function approveHandler(event) {
  event.target.innerText = "approving...";
  //handler approve button on post
  var postId = getPostId(event);
  $.post(
    "/home/updateStatus",
    { id: postId, newStatus: "approved" },
    (data, status) => {
      //handle result of post request
      console.log(data);
      if ((data = "updated")) {
        updateHeaderColor(event, "#17706e");
        updateHeaderText(event, "approved");
        enableRejectFromApprove(event);
        event.target.disabled = true;
      } else {
        alert("error updating : try again");
      }
      event.target.innerText = "Approve";
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
  console.log(event.target.nextElementSibling);
  //handle reject button on post

  event.target.innerText = "rejecting...";
  var postId = getPostId(event);
  $.post(
    "/home/updateStatus",
    { id: postId, newStatus: "rejected" },
    (data, status) => {
      //handle result of post request
      console.log(data);
      if ((data = "updated")) {
        updateHeaderColor(event, "#d92027");
        updateHeaderText(event, "rejected");
        enableApproveFromReject(event);
        event.target.disabled = true;
      } else {
        alert("error updating : try again");
      }
      event.target.innerText = "Reject";
    }
  );
}

function enableRejectFromApprove(event) {
  event.target.nextElementSibling.disabled = false;
}
function enableApproveFromReject(event) {
  event.target.previousElementSibling.disabled = false;
}
function updateHeaderText(event, text) {
  event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.innerText = text;
}
function updateHeaderColor(event, colorHex) {
  event.target.parentElement.parentElement.parentElement.firstElementChild.style = `background-color:${colorHex}; color: #f5f5f5;`;
}
function getPostId(e) {
  return e.target.parentElement.parentElement.firstElementChild.value;
}
