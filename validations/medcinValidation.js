import { body } from "express-validator";

export const validateMedcin = [
  body("nom_medecin")
    .notEmpty().withMessage("Le nom est obligatoire."),
  body("prenom_medecin")
    .notEmpty().withMessage("Le prénom est obligatoire."),
  body("specialisation")
    .notEmpty().withMessage("La spécialisation est obligatoire."),
  body("num_tel")
    .notEmpty().withMessage("Le numéro de téléphone est obligatoire."),
  body("salle_consultation")
    .notEmpty().withMessage("La salle de consultation est obligatoire."),
  body("email")
    .notEmpty().withMessage("L'email est obligatoire.")
    .isEmail().withMessage("L'email doit être valide."),
];
