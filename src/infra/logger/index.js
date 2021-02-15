/**
 * Logs Request info
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const Logger = (req, res, next) => {
  const date = new Date();
  const formatted = (number) => {
    return number > 9
      ? number
      : '0' + number
  };

  const info = `${req.method} :: ${req.originalUrl}`;
  console.log(
    `[LOG_${formatted(date.getDate())}-${formatted(date.getMonth() + 1)}-${date.getFullYear()}_${formatted(date.getHours())}:${formatted(date.getMinutes())}:${formatted(date.getSeconds())}]:`, info  
  );
  next();
};

module.exports = Logger;