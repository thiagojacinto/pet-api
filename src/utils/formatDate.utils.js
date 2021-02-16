const moment = require("moment");

/**
 * Use momentJS to format date
 * @param {String} date string input of Date in format DD-MM-YYYY hh:mm:ss
 */
const formatDate = (date) => {
  return date
    ? moment(date, "DD-MM-YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss")
    : moment().format("YYYY-MM-DD hh:mm:ss");
};

module.exports = formatDate;