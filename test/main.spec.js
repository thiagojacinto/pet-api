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
    createdAt: "17-02-2021 12:06:56",
  })
  .expect(201)
  .expect(function (res) {
    if (!("insertId" in res.body)) throw new Error("Missing insertId");
  })
  .end(function (err, res) {
    if (err) {
      console.log("Register atendimento :: Test failed.", err);
    } else {
      console.log("Register atendimento :: Test passed.");
    }
    // serverInstance.close((err) => {
    //   if (err) console.error(err);
    // });
  });

/**
 * GIVEN a small client name into atendimento
 * WHEN post it to /atendimentos
 * THEN name validator error should be thrown
 */
test
  .post("/atendimento")
  .send({
    client: "Cl",
    pet: "Snoopy",
    service: "Washing",
    status: "progress",
    isFinalized: false,
    createdAt: "17-03-2021 10:12:05",
  })
  .expect(400)
  .expect(function (res) {
    if (res.body[0].field !== "client") throw new Error("Missing client");
  })
  .end(function (err, res) {
    if (err) {
      console.log("Register atendimento :: Invalid name :: Test failed.", err);
    } else {
      console.log("Register atendimento :: Invalid name :: Test passed.");
    }
    // serverInstance.close((err) => {
    //   if (err) console.error(err);
    // });
  });

/**
 * GIVEN a wrong date input in atendimento
 * WHEN post it to /atendimentos
 * THEN name validator error should be thrown
 */
test
  .post("/atendimento")
  .send({
    client: "Oh-my-zsh",
    pet: "Golden",
    service: "Cut",
    status: "progress",
    isFinalized: false,
    createdAt: "17-12-2018 15:11:05",
  })
  .expect(400)
  .expect(function (res) {
    if (res.body[0].field !== "createdAt") throw new Error("Missing createdAt");
  })
  .end(function (err, res) {
    if (err) {
      console.log("Register atendimento :: Invalid createdAt :: Test failed.", err);
    } else {
      console.log("Register atendimento :: Invalid createdAt :: Test passed.");
    }
    serverInstance.close((err) => {
      if (err) console.error(err);
    });
  });
