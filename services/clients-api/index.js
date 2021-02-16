const express = require("express");
const bodyParser = require("body-parser");
const faker = require("faker/Locale/pt_BR");

const app = express();

app.use(bodyParser.json());

app.get("/cpf/:cpf", (req, res) => {
  const { cpf } = req.params;

  if (cpf.length !== 11) {
    console.log(`GET :: CPF ${cpf} :: 400 - Bad Request`);
    res.status(400).json({ status: 400, message: "Invalid input CPF" });
  } else {
    console.log(`GET :: CPF ${cpf} :: 200 - OK`);
    res.status(200).json({
      cpf,
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      birthDate: faker.date.past(),
    });
  }
});

app.listen(8082, () => console.log("Client API running on :8082"));
