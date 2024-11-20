import { body } from "express-validator";

// Validation pour création (POST)
export const validateRendezVous = [
  body("date")
    .notEmpty()
    .withMessage("La date est obligatoire")
    .isISO8601()
    .withMessage("La date doit être au format ISO 8601"),
  body("heure")
    .notEmpty()
    .withMessage("L'heure est obligatoire")
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("L'heure doit être au format HH:MM"),
  body("motif")
    .notEmpty()
    .withMessage("Le motif est obligatoire")
    .isString()
    .withMessage("Le motif doit être une chaîne de caractères"),
  body("statut")
    .notEmpty()
    .withMessage("Le statut est obligatoire")
    .isString()
    .withMessage("Le statut doit être une chaîne de caractères"),
  body("id_patient")
    .notEmpty()
    .withMessage("L'ID du patient est obligatoire")
    .isInt()
    .withMessage("L'ID du patient doit être un entier"),
  body("id_medecin")
    .notEmpty()
    .withMessage("L'ID du médecin est obligatoire")
    .isInt()
    .withMessage("L'ID du médecin doit être un entier"),
];

// Validation pour mise à jour (PUT)
export const validateRendezVousUpdate = [
  body("date")
    .optional()
    .isISO8601()
    .withMessage("La date doit être au format ISO 8601"),
  body("heure")
    .optional()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("L'heure doit être au format HH:MM"),
  body("motif")
    .optional()
    .isString()
    .withMessage("Le motif doit être une chaîne de caractères"),
  body("statut")
    .optional()
    .isString()
    .withMessage("Le statut doit être une chaîne de caractères"),
  body("id_patient")
    .optional()
    .isInt()
    .withMessage("L'ID du patient doit être un entier"),
  body("id_medecin")
    .optional()
    .isInt()
    .withMessage("L'ID du médecin doit être un entier"),
];
