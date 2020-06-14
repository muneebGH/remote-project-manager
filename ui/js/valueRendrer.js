function renderPostValue(
  headerColor,
  status,
  dateTime,
  link,
  fullName,
  userName,
  comment
) {
  return `<div
    class="card text-center border rounded shadow"
    style="
      margin-top: 10px;
      margin-right: 10px;
      font-family: Actor, sans-serif;
      margin-bottom: 10px;
      margin-left: 10px;
    "
  >
    <div
      class="card-header"
      style="background-color: ${headerColor}; color: #f5f5f5;"
    >
      <div class="row">
        <div class="col text-left">${status}</div>
        <div class="col text-right">${dateTime}</div>
      </div>
    </div>
    <div class="card-body">
      <h4
        class="text-lowercase card-title"
        data-toggle="tooltip"
        data-bs-tooltip=""
        style="font-style: normal; color: #17706e;"
        title="click to download"
      >
        <a href="${link}">File link</a>
      </h4>
      <h6 class="text-muted card-subtitle mb-2">${fullName}/${userName}</h6>
      <p class="card-text">
        ${comment}
      </p>
    </div>
  </div>`;
}
