const server = require("./config");
const db = require("./infra/db/mysql");
const Tables = require("./infra/db/mysql/tables");

const app = server().app;

db.connect(
  (err) => {
  if (err) {
    console.error(err);
    throw new Error("DB Error");
  } else {
    console.log("DB :: Connected!");

    Tables.init(db);
    
    app.listen(server().PORT, () => console.log(`API Running at PORT: ${server().PORT}`));
  }
});

module.exports = app;