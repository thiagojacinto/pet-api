const { Router } = require("express");
const atendimentoRouter = Router();

atendimentoRouter.get('/', function (req, res) {
  res.status(200).json({ atendimentoId: 1, info: 'Info' });
});

atendimentoRouter.post('/', function(req, res) {
  res.status(201).json({ atendimentoId: 1 });
});

module.exports = atendimentoRouter