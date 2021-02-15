const express = require("express");
const Logger = require("../infra/logger");

module.exports = () => {
  const PORT = 3001;
  const app = express();

  app.use(Logger);

  return {app, PORT};
}