import express from "express";
import { login } from "../controllers/authController.js";
import { validateUserLogin } from "../validations/userValidation.js";

const router = express.Router();

router.post("/login", validateUserLogin, login);

export default router;
