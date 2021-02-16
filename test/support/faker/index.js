const faker = require("faker/locale/pt_BR");

module.exports = {
  uuid: () => faker.random.uuid()
}