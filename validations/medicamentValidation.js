import { body } from "express-validator";

export const validateMedicament = [
  body("Nom_medicament")
    .notEmpty().withMessage("Le champ 'Nom_medicament' est requis.")
    .isString().withMessage("Le champ 'Nom_medicament' doit être une chaîne de caractères."),
  
  body("Description")
    .optional()
    .isString().withMessage("Le champ 'Description' doit être une chaîne de caractères."),
  
  body("Dosage")
    .notEmpty().withMessage("Le champ 'Dosage' est requis.")
    .isString().withMessage("Le champ 'Dosage' doit être une chaîne de caractères."),
];
