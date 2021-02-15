const express = require("express");
const Logger = require("../infra/logger");
const AtentimentoRouter = require("../app/controllers/atendimento");

const principalRouter = express.Router();
principalRouter.all("/", function(req, res) {
  res
    .type("application/json")
    .redirect(301, "/atendimento");
});

module.exports = () => {
  const PORT = 3001;
  const app = express();

  app.use(Logger);
  app.use('/', principalRouter);
  app.use('/atendimento', AtentimentoRouter);

  return {app, PORT};
}