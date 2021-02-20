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
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;
    return atendimentoRepository.search(id);
    // db.query(sql, (err, result) => {
    //   if (err) {
    //     res.status(400).json(err);
    //   } else {
    //     const [item] = result;
    //     item ? res.status(200).json(item) : res.status(404).json({});
    //   }
    // });
  }

  atualizar(id, valores, res) {
    if (valores.createdAt) valores.createdAt = formatDate(valores.createdAt);
    if (valores.updatedAt) valores.updatedAt = formatDate(valores.updatedAt);

    const verify = "SELECT * FROM atendimentos WHERE id=?";
    const sql = "UPDATE atendimentos SET ? WHERE id=?";

    db.query(verify, id, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        db.query(sql, [valores, id], (err, result) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(202).json(result);
          }
        });
      }
    });
  }
}

module.exports = new Atendimento();
