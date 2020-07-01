var db = require("mongoose");

async function establishConnection() {
  dbUrl = String.raw`dburlhere`;

  await db.connect(
    dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      console.log("error in user connection to users =" + err);
    }
  );
}

// db.on("connected", () => {
//   console.log("a user connected");
// });
//
// db.on("disconnected", () => {
//   console.log("a user disconnected");
// });

module.exports = {
  establishConnection: establishConnection,
};
