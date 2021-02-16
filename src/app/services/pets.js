const db = require("../../infra/db/mysql");

class Pet {

  /**
   * Register new Pet
   * @param {*} pet 
   * @param {*} res Express.Response
   */
  add(pet, res) {
    const sql = "INSERT INTO pets SET ?";

    db.query(sql, pet, (err, results) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const { insertId } = results;
        res.status(201).json({
          id: insertId,
          ...pet
        })
      }
    })
  }
};

module.exports = new Pet();