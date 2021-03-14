const request = require("supertest");
const faker = require("faker");
const server = require("../src/config");

const serverInstance = server().app;
const test = request(serverInstance);

const RANDOM_IMG = () => {
  const random = Math.floor(Math.random() * 6) + 1;
  return `repo/images/img${random}.jpg`;
};

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
    console.log("Main :: Redirect to /atendimento :: Test passed.");
    // serverInstance.close();
  });

/**
 * GIVEN have a correct filled atendimento properties
 * WHEN post it to /atendimentos
 * THEN a new atendendimento must be created
 */
test
  .post("/atendimento")
  .send({
    client: faker.helpers.shuffle("12345678908".split("")).join(""),
    pet: faker.name.firstName(),
    service: faker.commerce.department(),
    status: faker.random.arrayElement([
      "initialized",
      "progress",
      "waiting",
      "undefined",
    ]),
    isFinalized: faker.random.boolean(),
    createdAt: "21-05-2021 09:49:32",
  })
  .expect(201)
  .expect(function (res) {
    if (!("id" in res.body)) throw new Error("Missing id");
    if (!("cpf" in res.body.client)) throw new Error("Missing client.cpf");
  })
  .end(function (err, res) {
    if (err) {
      console.log("/atendimento :: Register atendimento :: Test failed.");
      throw err;
    } else {
      console.log("/atendimento :: Register atendimento :: Test passed.");
    }
    // serverInstance.close();
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
    client: "12",
    pet: "ShouldHaveFailedClientValidation",
    service: "FAILURE",
    status: "FAILURE",
    isFinalized: false,
  })
  .expect(400)
  .expect(function (res) {
    if (res.body.details[0].field !== "client")
      throw new Error("Missing client");
  })
  .end(function (err, res) {
    if (err) {
      console.log(
        "/atendimento :: Register atendimento :: Invalid name :: Test failed."
      );
      throw err;
    } else {
      console.log(
        "/atendimento :: Register atendimento :: Invalid name :: Test passed."
      );
    }
    // serverInstance.close();
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
    client: faker.name.findName(),
    pet: "ShouldHaveFailedCreatedAtValidation",
    service: "FAILURE",
    status: "FAILURE",
    isFinalized: false,
    createdAt: "17-12-2018 15:11:05",
  })
  .expect(400)
  .expect(function (res) {
    if (res.body.details[0].field !== "createdAt")
      throw new Error("Missing createdAt");
  })
  .end(function (err, res) {
    if (err) {
      console.log(
        "/atendimento :: Register atendimento :: Invalid createdAt :: Test failed."
      );
      throw err;
    } else {
      console.log(
        "/atendimento :: Register atendimento :: Invalid createdAt :: Test passed."
      );
    }
    // serverInstance.close();
    // serverInstance.close((err) => {
    //   if (err) console.error(err);
    // });
  });

/**
 * WHEN get /atendimento
 * THEN returns a list of saved atendimentos
 */
test
  .get("/atendimento")
  .expect(200)
  .expect(function (res) {
    if (!Array.isArray(res.body)) throw new Error("Array was expected");
    if (!res.body.every((item) => item.id))
      throw new Error("Wrong Array of Atendimentos");
  })
  .end(function (err, res) {
    if (err) {
      console.log("/atendimento :: List atendimentos :: Test failed.");
      throw err;
    } else {
      console.log(
        "/atendimento :: List atendimentos :: Return all registered :: Test passed."
      );
    }
    // serverInstance.close();
    // serverInstance.close((err) => {
    //   if (err) console.error(err);
    // });
  });

/**
 * GIVEN a registered atendimento with ID
 * WHEN search for an ID at /atendimento/ID
 * THEN returns the existent atendimento for that ID
 */
test
  .get("/atendimento/3")
  .expect(200)
  .expect(function (res) {
    if (res.body.id != 3) throw new Error("Expected ID = 3");
  })
  .end(function (err, res) {
    if (err) {
      console.log("/atendimento :: Search atendimento by ID :: Test failed.");
      throw err;
    } else {
      console.log("/atendimento :: Search atendimento by ID :: Test passed.");
    }
    // serverInstance.close();
    // serverInstance.close((err) => {
    //   if (err) console.error(err);
    // });
  });

/**
 * GIVEN a non-registered atendimento ID
 * WHEN search with that ID at /atendimento/ID
 * THEN returns error 404 and empty object
 */
test
  .get("/atendimento/3000")
  .expect(404)
  .expect(function (res) {
    if (JSON.stringify(res.body.details) !== "{}")
      throw new Error("Expected empty object");
  })
  .end(function (err, res) {
    if (err) {
      console.log(
        "/atendimento :: Search atendimento by inexistent ID :: Test failed."
      );
      throw err;
    } else {
      console.log(
        "/atendimento :: Search atendimento by inexistent ID :: Test passed."
      );
    }
    // serverInstance.close();
    // serverInstance.close((err) => {
    //   if (err) console.error(err);
    // });
  });

/**
 * GIVEN a registered atendimento ID
 * WHEN patch with that ID at /atendimento/ID
 * THEN returns status 202
 * AND the atendimento is updated
 */
test
  .patch("/atendimento/2")
  .send({
    pet: "Babalu",
    updatedAt: "25-11-2019 16:43:23",
    service: "hairdressing",
  })
  .expect(202)
  .expect(function (res) {
    if (res.error) throw new Error("Error not expected");
    if (res.body.affectedRows != 1) throw new Error("Change expected to be 1");
  })
  .end(function (err, res) {
    if (err) {
      console.log(
        "/atendimento :: Patch atendimento by valid ID :: Test failed."
      );
      throw err;
    } else {
      console.log(
        "/atendimento :: Patch atendimento by valid ID :: Test passed."
      );
    }
    // serverInstance.close();
    // serverInstance.close((err) => {
    //   if (err) console.error(err);
    // });
  });
const randomNumber = Math.floor(Math.random() * 2500);
/**
 * GIVEN a non-registered atendimento ID
 * WHEN patch with that ID at /atendimento/ID
 * THEN returns status 404
 * AND no changes are registered
 */
test
  .patch("/atendimento/" + randomNumber)
  .send({
    pet: "Babalu" + randomNumber,
    updatedAt: "30-11-2015 12:21:23",
    service: "nothing",
  })
  .expect(404)
  .expect(function (res) {
    // if (res.error) throw new Error("Error not expected");
    // if (res.body.affectedRows === 1) throw new Error("Change expected to be 0");
    if (!res.body.details.message.includes("not found"))
      throw new Error("ID should be inexistent, not found expected.");
  })
  .end(function (err, res) {
    if (err) {
      console.log(
        "/atendimento :: Patch atendimento by inexistent ID :: Test failed."
      );
      throw err;
    } else {
      console.log(
        "/atendimento :: Patch atendimento by inexistent ID :: Test passed."
      );
    }
    // serverInstance.close();
  });

// PETS CONTROLLER

/**
 * GIVEN have a correct filled Pet properties
 * WHEN post it to /pets
 * THEN a new pet must be created
 */
test
  .post("/pets")
  .send({
    pet: faker.name.findName(),
    imageUri: RANDOM_IMG(),
  })
  .expect(201)
  .expect(function (res) {
    if (!("id" in res.body)) throw new Error("Missing id");
    if (!res.body.imageUri.match(/assets/))
      throw new Error("Image URI should contain /assets directory.");
  })
  .end(function (err, res) {
    if (err) {
      console.log("/pets :: Register Pet :: Test failed.");
      throw err;
    } else {
      console.log("/pets :: Register Pet :: Test passed.");
    }
    process.exit(0);
  });