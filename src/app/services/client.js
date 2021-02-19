const getJSON = require("../../utils/getRequest.utils");

class Client {
  /**
   * Gather info from external Client API
   * @param {*} cpf 
   * @param {*} callback 
   */
  getInfo(cpf) {
    const options = {
      host: "localhost",
      port: 8082,
      path: `/cpf/${cpf}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return new Promise((resolve, reject) => {
      getJSON(options, (status, res) => {
        (status != 200) 
        ? reject(res)
        : resolve(res);
      });
    });
  }
}

module.exports = new Client();