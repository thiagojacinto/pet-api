const { Router } = require("express");
const Pets = require("../../services/pets");

const petsRouter = Router();

petsRouter.post("/", function (req, res) {
  Pets.add(req.body, res);
})

module.exports = petsRouter;