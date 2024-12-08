import { body } from "express-validator";

export const validatePatient = [
  body("nom_patient")
    .notEmpty().withMessage("Le champ 'nom_patient' est requis.")
    .isString().withMessage("Le champ 'nom_patient' doit être une chaîne de caractères."),
  body("prenom_patient")
    .notEmpty().withMessage("Le champ 'prenom_patient' est requis.")
    .isString().withMessage("Le champ 'prenom_patient' doit être une chaîne de caractères."),
  body("date_naissance")
    .notEmpty().withMessage("Le champ 'date_naissance' est requis.")
    .isISO8601().withMessage("Le champ 'date_naissance' doit être une date valide."),
  body("adresse")
    .notEmpty().withMessage("Le champ 'adresse' est requis.")
    .isString().withMessage("Le champ 'adresse' doit être une chaîne de caractères."),
  body("num_tel")
    .notEmpty().withMessage("Le champ 'num_tel' est requis.")
    .isString().withMessage("Le champ 'num_tel' doit être une chaîne de caractères."),
  body("email")
    .notEmpty().withMessage("Le champ 'email' est requis.")
    .isEmail().withMessage("Le champ 'email' doit être une adresse email valide."),
  body("assurance_medical")
    .optional()
    .isString().withMessage("Le champ 'assurance_medical' doit être une chaîne de caractères."),
];
