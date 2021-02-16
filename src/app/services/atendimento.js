const moment = require("moment");
const db = require("../../infra/db/mysql");
const errors = require("../domain/validators/atendimento");

class Atendimento {
  registrar(atendimento, res) {
    const updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
    const createdAt = moment(
      atendimento.createdAt,
      "DD-MM-YYYY hh:mm:ss"
    ).format("YYYY-MM-DD hh:mm:ss");
    const postData = { ...atendimento, createdAt, updatedAt };

    const validationErrors = errors(postData);

    if (validationErrors.length) {
      res.status(400).json(validationErrors);
    } else {
      const sql = "INSERT INTO atendimentos SET ?";

      db.query(sql, postData, (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(result);
        }
      });
    }
  }

  listar(res) {
    const sql = "SELECT * FROM atendimentos";

    db.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }

  listarPorId(id, res) {
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;

    db.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const [ item ] = result;
        item ? res.status(200).json(item) : res.status(404).json({});
      }
    });
  }
};

module.exports = new Atendimento;