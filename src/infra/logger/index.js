/**
 * Logs Request info
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const Logger = (req, res, next) => {
  const date = new Date();
  const info = `${req.method} :: ${req.originalUrl}`;
  console.log(
    `[LOG ${date.getDate()}-${date.getMonth()}-${date.getYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}]:`, info  
  );
  next();
};

module.exports = Logger;