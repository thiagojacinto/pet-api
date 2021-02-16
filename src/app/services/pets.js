const db = require("../../infra/db/mysql");
const uploadStreamImage = require("../../utils/uploadImage.utils");
const petValidator = require("../domain/validators/imageExtensions");

class Pet {

  /**
   * Register new Pet
   * @param {*} pet 
   * @param {*} res Express.Response
   */
  add(pet, res) {
    const validatorErrors = petValidator(pet);

    if (validatorErrors.length) {
      res.status(400).json(validatorErrors);
    } else {
      uploadStreamImage(pet.imageUri, (err, output) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          const validatedPet = { imageUri: output, pet: pet.pet };
          const sql = "INSERT INTO pets SET ?";
           db.query(sql, validatedPet, (err, results) => {
            if (err) {
              res.status(400).json(err);
            } else {
              const { insertId } = results;
              res.status(201).json({
                id: insertId,
                ...validatedPet
              });
            }
          });
        }
      });
    }
  }
};
    
module.exports = new Pet();