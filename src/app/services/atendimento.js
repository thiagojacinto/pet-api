const moment = require("moment");
const db = require("../../infra/db/mysql");

class Atendimento {
  registrar(atendimento, res)  {
    const updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
    const createdAt = moment(atendimento.createdAt, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
    const postData = { ...atendimento, createdAt, updatedAt };
    const sql = "INSERT INTO atendimentos SET ?";

    db.query(sql, postData, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(result);
      }
    });
  };
};

module.exports = new Atendimento;