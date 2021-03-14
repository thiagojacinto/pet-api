const uploadStreamImage = require("../../utils/uploadImage.utils");
const petValidator = require("../domain/validators/imageExtensions");
const petRepository = require("../repositories/pet.repository");

class Pet {

  /**
   * Register new Pet
   * @param {*} pet 
   */
  add(pet) {
    return new Promise((resolve, reject) => {
      const validatorErrors = petValidator(pet);

      if (validatorErrors.length) {
        reject(validatorErrors);
      }

      uploadStreamImage(pet.imageUri, (err, output) => {
        if (err) {
          reject(err);
        } else {
          const validatedPet = { imageUri: output, pet: pet.pet };
          resolve(petRepository.add(validatedPet));
        }
      });
    });
  }
};
    
module.exports = new Pet();