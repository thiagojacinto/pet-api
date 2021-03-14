const db = require("../../infra/db/mysql");
const formatDate = require("../../utils/formatDate.utils");
const errors = require("../domain/validators/atendimento");
const atendimentoRepository = require("../repositories/atendimento.repository");

class Atendimento {
  registrar(atendimento) {
    const updatedAt = formatDate();
    const createdAt = formatDate(atendimento.createdAt);

    return new Promise((resolve, reject) => {
      const newAtendimento = { ...atendimento, createdAt, updatedAt };
      let validationErrors;
      try {
        validationErrors = errors(newAtendimento);
      } catch (error) {
        reject(error);
      }

      if (validationErrors.length) {
        reject(validationErrors);
      } else {
        resolve(atendimentoRepository.add(newAtendimento));
      }
    });
  }

  listar() {
    return atendimentoRepository.list();
  }

  listarPorId(id) {
    return atendimentoRepository.search(id);
  }

  async atualizar(id, valores) {

    if (valores.createdAt) delete valores.createdAt
    valores.updatedAt = formatDate();

    return atendimentoRepository.update(id, valores);
  }
}

module.exports = new Atendimento();
