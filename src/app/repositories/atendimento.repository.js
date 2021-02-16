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
}

module.exports = new AtendimentoRepository();