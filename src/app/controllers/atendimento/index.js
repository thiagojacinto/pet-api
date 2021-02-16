const { Router } = require("express");
const atendimentoRouter = Router();
const Atendimento = require("../../services/atendimento");

atendimentoRouter.get('/', function (req, res) {
  Atendimento.listar(res);
});

atendimentoRouter.get('/:id', function (req, res) {
  const { id } = req.params;
  Atendimento.listarPorId(id, res);
});

atendimentoRouter.post('/', async function(req, res) {
  Atendimento.registrar(req.body, res);
});

module.exports = atendimentoRouter