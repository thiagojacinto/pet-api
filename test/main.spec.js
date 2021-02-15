const request = require("supertest");
const server = require("../src/config");

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
    // serverInstance.close((err) => {
    //   if (err) console.error(err);
    // });
  });

/**
 * GIVEN have a correct filled atendimento properties
 * WHEN post it to /atendimentos
 * THEN a new atendendimento must be created
 */
test
  .post("/atendimento")
  .send({
    client: "Client n.1",
    pet: "Abdiel",
    service: "Cleaning",
    status: "initialized",
    isFinalized: false,
  })
  .expect(201)
  .expect({ client: "Client n.1", pet: "Abdiel" })
  .end(function (err, res) {
    if (err) throw err;
    console.log("Register atendimento :: Test passed.");
    serverInstance.close((err) => {
      if (err) console.error(err);
    });
  });
  