const { Router } = require("express");
const { Serializer } = require("../../domain/serializers");
const Pets = require("../../services/pets");

const petsRouter = Router();

petsRouter.post("/", function (req, res) {
  const serializer = new Serializer(res);

  Pets.add(req.body)
    .then((results) => {
      const { insertId } = results;
      res.status(201).json({
        id: insertId,
        pet: req.body.pet
      });
    })
    .catch((err) => serializer.StandardError(400, err));
});

module.exports = petsRouter;
