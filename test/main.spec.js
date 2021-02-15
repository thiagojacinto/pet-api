const request = require("supertest");
const server = require("../src/config")

request(server().app.listen())
  .get("/")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });