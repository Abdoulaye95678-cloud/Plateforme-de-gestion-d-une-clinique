import { body } from "express-validator";

export const validateOrdonnance = [
  body("date_emission")
    .notEmpty().withMessage("Le champ 'date_emission' est requis.")
    .isDate().withMessage("Le champ 'date_emission' doit être une date valide."),
  body("id_medecin")
    .notEmpty().withMessage("Le champ 'id_medecin' est requis.")
    .isInt().withMessage("Le champ 'id_medecin' doit être un entier."),
  body("id_patient")
    .notEmpty().withMessage("Le champ 'id_patient' est requis.")
    .isInt().withMessage("Le champ 'id_patient' doit être un entier."),
  body("notes")
    .optional()
    .isString().withMessage("Le champ 'notes' doit être une chaîne de caractères."),
];
