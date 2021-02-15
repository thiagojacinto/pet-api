const moment = require("moment");
const db = require("../../infra/db/mysql");

class Atendimento {
  async registrar(atendimento)  {
    atendimento.updatedAt = moment().format("YYYY-MM-DD HH:MM:SS");
    const createdAt = moment(atendimento.createdAt, "DD-MM-YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );
    const sql = "INSERT INTO atendimentos SET ?";

    return await db.query(sql, {...atendimento, createdAt}, function(err, response) {
      if (err) console.error(err)
      else {
        console.log("Atendimento registered :: ", response);
        return response;
      }
    });
  }
};

module.exports = new Atendimento;