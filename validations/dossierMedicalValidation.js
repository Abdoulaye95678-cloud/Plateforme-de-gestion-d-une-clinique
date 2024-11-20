import { body } from "express-validator";

// Validation pour la création d'un dossier médical
export const validateDossierMedicalCreation = [
  body("id_patient")
    .notEmpty().withMessage("Le champ 'id_patient' est requis.")
    .isInt().withMessage("Le champ 'id_patient' doit être un entier."),
  body("id_medecin")
    .notEmpty().withMessage("Le champ 'id_medecin' est requis.")
    .isInt().withMessage("Le champ 'id_medecin' doit être un entier."),
  body("date_creation")
    .optional()
    .isDate().withMessage("Le champ 'date_creation' doit être une date valide."),
  body("symptomes")
    .optional()
    .isString().withMessage("Le champ 'symptomes' doit être une chaîne de caractères."),
  body("diagnostic")
    .optional()
    .isString().withMessage("Le champ 'diagnostic' doit être une chaîne de caractères."),
  body("traitement")
    .optional()
    .isString().withMessage("Le champ 'traitement' doit être une chaîne de caractères."),
];

// Validation pour la mise à jour d'un dossier médical
export const validateDossierMedicalUpdate = [
  body("id_patient")
    .optional() // Non requis pour la mise à jour
    .isInt().withMessage("Le champ 'id_patient' doit être un entier."),
  body("id_medecin")
    .optional() // Non requis pour la mise à jour
    .isInt().withMessage("Le champ 'id_medecin' doit être un entier."),
  body("date_creation")
    .optional()
    .isDate().withMessage("Le champ 'date_creation' doit être une date valide."),
  body("symptomes")
    .optional()
    .isString().withMessage("Le champ 'symptomes' doit être une chaîne de caractères."),
  body("diagnostic")
    .optional()
    .isString().withMessage("Le champ 'diagnostic' doit être une chaîne de caractères."),
  body("traitement")
    .optional()
    .isString().withMessage("Le champ 'traitement' doit être une chaîne de caractères."),
];
