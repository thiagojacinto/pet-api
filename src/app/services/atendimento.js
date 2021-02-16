const moment = require("moment");
const db = require("../../infra/db/mysql");
const errors = require("../domain/validators/atendimento");
const Client = require("./client");

/**
 * Use momentJS to format date
 * @param {String} date string input of Date in format DD-MM-YYYY hh:mm:ss
 */
const formatDate = (date) => {
  return date
    ? moment(date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss")
    : moment().format("YYYY-MM-DD hh:mm:ss");
};

class Atendimento {
  registrar(atendimento, res) {
    const updatedAt = formatDate();
    const createdAt = formatDate(atendimento.createdAt);

    const postData = { ...atendimento, createdAt, updatedAt };

    const validationErrors = errors(postData);

    if (validationErrors.length) {
      res.status(400).json(validationErrors);
    } else {
      const sql = "INSERT INTO atendimentos SET ?";
      Client.getInfo(10020030040, (statusCode, clientResult) => {
        if (statusCode == 200) {
          db.query(sql, postData, (err, result) => {
            if (err) {
              res.status(400).json(err);
            } else {
              postData.client = clientResult;
              postData.id = result.insertId;
              res.status(201).json(postData);
            }
          });
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
        const [item] = result;
        item ? res.status(200).json(item) : res.status(404).json({});
      }
    });
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
};

module.exports = new Atendimento();
