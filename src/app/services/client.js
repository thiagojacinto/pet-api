const getJSON = require("../../utils/getRequest.utils");

class Client {
  /**
   * Gather info from external Client API
   * @param {*} cpf 
   * @param {*} callback 
   */
  getInfo(cpf, callback) {
    const options = {
      host: "localhost",
      port: 8082,
      path: `/cpf/${cpf}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    getJSON(options, callback);
  }
}

module.exports = new Client();