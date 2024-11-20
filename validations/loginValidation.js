import { body } from "express-validator";

const loginRules = [
  body("email")
    .notEmpty().withMessage("L'email est requis.")
    .isEmail().withMessage("Email invalide."),
  body("mot_de_passe")
    .notEmpty().withMessage("Le mot de passe est requis.")
    .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères."),
  body("role")
    .notEmpty().withMessage("Le rôle est requis.")
    .isIn(["medcin", "patient", "infirmier"]).withMessage("Le rôle doit être medcin, patient ou infirmier."),
];

export default loginRules;
