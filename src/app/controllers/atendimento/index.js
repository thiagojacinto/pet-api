const { Router } = require("express");
const Atendimento = require("../../services/atendimento");

const atendimentoRouter = Router();

atendimentoRouter.patch('/:id', function (req, res) {
  const { id } = req.params;
  Atendimento.atualizar(id, req.body, res);
});

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