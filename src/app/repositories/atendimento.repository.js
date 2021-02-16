const execQuery = require("../../infra/db/mysql/queries");

class AtendimentoRepository {
  /**
   * Add new Atendimento into repository
   * @param {*} newAtendimento Atendimento
   */
  add(newAtendimento) {
    const sql = "INSERT INTO atendimentos SET ?";
    return execQuery(sql, newAtendimento);
  }

  /**
   * Returns a list of registered Atendimentos
   */
  list() {
    const sql = "SELECT * FROM atendimentos";
    return execQuery(sql);
  }
}

module.exports = new AtendimentoRepository();