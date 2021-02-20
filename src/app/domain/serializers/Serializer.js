class Serializer {

  constructor(response) {
    this.response = response;
  }

  _toJSON(data) {
    return this.response.json(data);
  };

  /**
   * 
   * @param {*} status HTTP Error code
   * @param {*} data Data to send with error
   */
  StandardError (status, data) {
    const STD_ERROR_FORMAT = { 
      error: status, 
      details: data 
    };

    this.response.status(status);
    this._toJSON(STD_ERROR_FORMAT)
    return this.response;
  };
}

module.exports = Serializer;