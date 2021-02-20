const { Router } = require("express");
const { Serializer } = require("../../domain/serializers");
const { AtendimentoService, ClientService } = require("../../services/");

const atendimentoRouter = Router();

atendimentoRouter.patch("/:id", function (req, res) {
  const { id } = req.params;
  AtendimentoService.atualizar(id, req.body, res);
});

atendimentoRouter.get("/", function (req, res) {
  AtendimentoService.listar()
    .then((results) => res.json(results))
    .catch((err) => res.status(400).json(err));
});

atendimentoRouter.get("/:id", function (req, res) {
  const { id } = req.params;
  AtendimentoService.listarPorId(id)
    .then((found) => {
      const [item] = found;
      item ? res.status(200).json(item) : res.status(404).json({});
    })
    .catch((err) => res.status(400).json(err));
});

atendimentoRouter.post("/", async function (req, res) {
  const novoAtendimento = req.body;
  AtendimentoService.registrar(novoAtendimento)
    .then(async (result) => {
      novoAtendimento.client = await ClientService.getInfo(novoAtendimento.client);
      res.status(201).json({
        id: result.insertId,
        ...novoAtendimento,
      });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = atendimentoRouter;