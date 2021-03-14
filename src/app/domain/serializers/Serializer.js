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
    const filteredData = this._filterSensiveInfo(data);
    const STD_ERROR_FORMAT = { 
      error: status, 
      details: filteredData 
    };

    this.response.status(status);
    this._toJSON(STD_ERROR_FORMAT)
    return this.response;
  };

  _filterSensiveInfo(data) {
    if (data.sql) delete data.sql;
    return data;
  }
}

module.exports = Serializer;