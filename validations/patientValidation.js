import { body } from "express-validator";

export const validatePatient = [
  body("Nom_patient")
    .notEmpty().withMessage("Le champ 'Nom_patient' est requis.")
    .isString().withMessage("Le champ 'Nom_patient' doit être une chaîne de caractères."),
  body("Prenom_patient")
    .notEmpty().withMessage("Le champ 'Prenom_patient' est requis.")
    .isString().withMessage("Le champ 'Prenom_patient' doit être une chaîne de caractères."),
  body("Date_naissance")
    .notEmpty().withMessage("Le champ 'Date_naissance' est requis.")
    .isISO8601().withMessage("Le champ 'Date_naissance' doit être une date valide."),
  body("Adresse")
    .notEmpty().withMessage("Le champ 'Adresse' est requis.")
    .isString().withMessage("Le champ 'Adresse' doit être une chaîne de caractères."),
  body("Num_tel")
    .notEmpty().withMessage("Le champ 'Num_tel' est requis.")
    .isString().withMessage("Le champ 'Num_tel' doit être une chaîne de caractères."),
  body("Email")
    .notEmpty().withMessage("Le champ 'Email' est requis.")
    .isEmail().withMessage("Le champ 'Email' doit être une adresse email valide."),
  body("Assurance_medical")
    .optional()
    .isString().withMessage("Le champ 'Assurance_medical' doit être une chaîne de caractères."),
];
