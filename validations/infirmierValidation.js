import { body } from "express-validator";

// Validation des champs pour le modèle Infirmier
export const validateInfirmier = [
  body("nom_infirmier")
    .isString()
    .withMessage("Le nom de l'infirmier est obligatoire et doit être une chaîne de caractères."),
  body("prenom_infirmier")
    .isString()
    .withMessage("Le prénom de l'infirmier est obligatoire et doit être une chaîne de caractères."),
  body("num_tel")
    .isString()
    .withMessage("Le numéro de téléphone de l'infirmier est obligatoire et doit être une chaîne."),
  body("specialisation")
    .optional() // Champ facultatif
    .isString()
    .withMessage("La spécialisation doit être une chaîne de caractères."),
];
