const db = require("../../infra/db/mysql");

class Atendimento {
  async registrar(atendimento)  {
    const sql = "INSERT INTO atendimentos SET ?";

    return await db.query(sql, atendimento, function(err, response) {
      if (err) console.error(err)
      else {
        console.log("Atendimento registered :: ", response);
        return response;
      }
    });
  }
};

module.exports = new Atendimento;