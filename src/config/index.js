const express = require("express");
const bodyParser = require("body-parser");
const Logger = require("../infra/logger");
const AtentimentoRouter = require("../app/controllers/atendimento");
const PetsRouter = require("../app/controllers/pets");

const principalRouter = express.Router();
principalRouter.all("/", function(req, res) {
  res
    .type("application/json")
    .redirect(301, "/atendimento");
});

module.exports = () => {
  const PORT = 3001;
  const app = express();

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(Logger);
  app.use('/', principalRouter);
  app.use('/atendimento', AtentimentoRouter);
  app.use('/pets', PetsRouter);
  
  return {app, PORT};
}