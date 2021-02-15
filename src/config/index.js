const express = require("express");
const Logger = require("../infra/logger");
const AtentimentoRouter = require("../app/controllers/atendimento");

module.exports = () => {
  const PORT = 3001;
  const app = express();

  app.use(Logger);
  app.use('/', express.Router().get('/', function(req, res) {
    res.status(301).location('/atendimento')
  }));
  app.use('/atendimento', AtentimentoRouter);

  return {app, PORT};
}