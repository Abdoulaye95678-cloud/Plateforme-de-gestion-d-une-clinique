import { body } from "express-validator";

// Validation stricte pour la création
export const validateFactureForAdd = [
  body("Date_emission")
    .notEmpty()
    .withMessage("La date d'émission est obligatoire.")
    .isISO8601()
    .withMessage("La date doit être au format ISO 8601."),
  body("Montant")
    .notEmpty()
    .withMessage("Le montant est obligatoire.")
    .isDecimal()
    .withMessage("Le montant doit être un nombre valide."),
  body("Statut_paiement")
    .notEmpty()
    .withMessage("Le statut du paiement est obligatoire.")
    .isString()
    .withMessage("Le statut du paiement doit être une chaîne de caractères."),
  body("Id_patient")
    .notEmpty()
    .withMessage("L'identifiant du patient est obligatoire.")
    .isInt()
    .withMessage("L'identifiant du patient doit être un entier."),
];

// Validation souple pour la mise à jour
export const validateFactureForUpdate = [
  body("Date_emission")
    .optional()
    .isISO8601()
    .withMessage("La date doit être au format ISO 8601."),
  body("Montant")
    .optional()
    .isDecimal()
    .withMessage("Le montant doit être un nombre valide."),
  body("Statut_paiement")
    .optional()
    .isString()
    .withMessage("Le statut du paiement doit être une chaîne de caractères."),
  body("Id_patient")
    .optional()
    .isInt()
    .withMessage("L'identifiant du patient doit être un entier."),
];
