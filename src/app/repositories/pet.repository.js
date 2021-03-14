const execQuery = require("../../infra/db/mysql/queries");

class PetRepository {
  /**
   * Add new Pet into repository
   * @param {*} newPet Pet
   */
  add(newPet) {
    const sql = "INSERT INTO pets SET ?";
    return execQuery(sql, newPet);
  };
}

module.exports = new PetRepository();