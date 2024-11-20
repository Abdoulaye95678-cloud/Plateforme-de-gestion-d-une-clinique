import { body } from "express-validator";

export const validateUserLogin = [
  body("email")
    .notEmpty()
    .withMessage("L'email est requis.")
    .isEmail()
    .withMessage("Email invalide."),
  body("mot_de_passe")
    .notEmpty()
    .withMessage("Le mot de passe est requis.")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères."),
];
