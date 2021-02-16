const moment = require("moment");

const isDateValid = (date, updatedAt) => {
  return moment(date).isSameOrAfter(updatedAt);
};

const isNameValid = (name) => {
  return name.length >= 3;
}

const validations = (atendimento) => ([
  {
    field: 'createdAt',
    isValid: isDateValid(atendimento.createdAt, atendimento.updatedAt),
    message: 'Date must be equal or later than now.'
  },
  {
    field: 'client',
    isValid: isNameValid(atendimento.client),
    message: 'Name must be at least 3 characters long.'
  }
]);

const errors = (atendimento) => (validations(atendimento).filter(item => !item.isValid));

module.exports = errors;