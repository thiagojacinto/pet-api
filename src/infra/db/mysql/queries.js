const db = require("./index");
/**
 * Promisified executor for SQL Query
 * @param {*} desiredQuery SQL Query
 * @param {*} parameters Optional parameters for SQL Query
 */
function execQuery(desiredQuery, parameters = '') {
  return new Promise((resolve, reject) => {
    db.query(desiredQuery, parameters, (err, result, extra) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = execQuery;