const { Router } = require("express");
const atendimentoRouter = Router();
const Atendimento = require("../../services/atendimento");

atendimentoRouter.get('/', function (req, res) {
  res.status(200).json({ atendimentoId: 1, info: 'Info' });
});

atendimentoRouter.post('/', async function(req, res) {
  Atendimento.registrar(req.body, res);
});

module.exports = atendimentoRouter