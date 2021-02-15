const request = require("supertest");
const server = require("../src/config")

const serverInstance = server().app.listen();
const test = request(serverInstance);

/**
 * WHEN access home "/"
 * THEN should redirect to "/atendimento"
 * AND status should be 301
 */
test
  .get("/")
  .expect("Location", "/atendimento")
  .expect(301)
  .end(function (err, res) {
    if (err) throw err;
    console.log("Main :: Test passed.");
    serverInstance.close((err) => {
      if (err) console.error(err)
    });
  });