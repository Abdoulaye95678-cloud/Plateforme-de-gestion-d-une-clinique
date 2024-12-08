import express from "express";
import { body } from "express-validator";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("L'email est invalide."),
    body("mot_de_passe").notEmpty().withMessage("Le mot de passe est requis."),
  ],
  login
);

export default router;
