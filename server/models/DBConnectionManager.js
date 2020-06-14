var db = require("mongoose");

async function establishConnection() {
  dbUrl = String.raw`mongodb+srv://muneeb:Ie1Tfvbp2KIxe8X3@team-mpl-d6w1x.mongodb.net/teamMPL?retryWrites=true&w=majority`;

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
