const { Router } = require("express");
const atendimentoRouter = Router();
const Atendimento = require("../../services/atendimento");

atendimentoRouter.get('/', function (req, res) {
  res.status(200).json({ atendimentoId: 1, info: 'Info' });
});

atendimentoRouter.post('/', async function(req, res) {
  const dbResponse = await Atendimento.registrar(req.body);
  return res.status(201).send({
    id: dbResponse.OkPacket.insertId,
    client: req.body.client,
    pet: req.body.pet,
  });
});

module.exports = atendimentoRouter