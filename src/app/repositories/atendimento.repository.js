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

  /**
   * Search for an Atendimento by its ID
   * @param {*} id <Number> Atendimento ID
   */
  search(id) {
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;
    return execQuery(sql);
  }

  /**
   * Update data from the Atendimento which ID correspond
   * @param {*} id 
   * @param {*} data 
   */
  async update(id, data) {
    const sql = "UPDATE atendimentos SET ? WHERE id=?";
    return execQuery(sql, [data, id]);
  }
}

module.exports = new AtendimentoRepository();
