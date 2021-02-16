const { Router } = require("express");
const Atendimento = require("../../services/atendimento");
const Client = require("../../services/client"); 

const atendimentoRouter = Router();

atendimentoRouter.patch('/:id', function (req, res) {
  const { id } = req.params;
  Atendimento.atualizar(id, req.body, res);
});

atendimentoRouter.get('/', function (req, res) {
  Atendimento.listar()
    .then(results => res.json(results))
    .catch(err => res.status(400).json(err));
});

atendimentoRouter.get('/:id', function (req, res) {
  const { id } = req.params;
  Atendimento.listarPorId(id, res);
});

atendimentoRouter.post('/', async function(req, res) {
  const novoAtendimento = req.body;
  Atendimento.registrar(novoAtendimento)
    .then(result => { 
      Client.getInfo(novoAtendimento.client, (statusCode, resultClient) => {
        if (statusCode == 200) {
          novoAtendimento.client = resultClient;
          res.status(201).json({
            id: result.insertId,
            ...novoAtendimento
          });
        }
      });
    })
    .catch(err => res.status(400).json(err));
});

module.exports = atendimentoRouter