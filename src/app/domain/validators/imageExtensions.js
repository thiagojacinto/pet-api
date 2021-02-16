const path = require("path");

const validExtensions = [
  '.jpg', '.png', '.gif', '.jpg'
];

const isExtensionValid = (data) => {
  const extension = path.extname(data);
  return validExtensions.indexOf(extension) !== -1;
};

const validations = (pet) => [
  {
    field: "imageUri",
    isValid: isExtensionValid(pet.imageUri),
    message: "Image extension must be one of the following: JPG, PNG, GIF or JPEG.",
  },
];

const errors = (pet) =>
  validations(pet).filter((item) => !item.isValid);

module.exports = errors;
