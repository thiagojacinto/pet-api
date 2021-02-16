class Tables {

  init(connection) {
    this.connection = connection;

    this.createAtendimentoTable();
    this.createPetsTable();
  }

  createAtendimentoTable() {
    const sql =
      "CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, client varchar(14) NOT NULL, pet varchar(50), service varchar(30) NOT NULL, status varchar(20) NOT NULL, isFinalized boolean NOT NULL, obs text, updatedAt datetime NOT NULL, createdAt datetime NOT NULL, PRIMARY KEY(id))";

    this.connection.query(
      sql,
      (err) => {
        err
          ? console.log("SQL Error ::", err)
          : console.log("SQL :: Table 'atentdimentos' successfully created.");
      } 
    );
  }

  createPetsTable() {
    const sql =
      "CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT, pet varchar(50), imageUri varchar(200), PRIMARY KEY(id))";

    this.connection.query(sql, (err) => {
      err
        ? console.log("SQL Error ::", err)
        : console.log("SQL :: Table 'pets' successfully created.");
    });
  }
}

module.exports = new Tables;