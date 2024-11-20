import express from "express";
import {
  medcinList,
  addMedcin,
  getMedcinById,
  updateMedcin,
  deleteMedcin,
} from "../controllers/medcinController.js";
import { validateMedcin } from "../validations/medcinValidation.js";
import { verifierToken } from "../authentification/verifierToken.js";
import autoriser from "../authentification/autoriser.js";

const router = express.Router();

// Routes sécurisées
router.get("/", verifierToken, autoriser(["admin"]), medcinList);
router.post("/", verifierToken, autoriser(["admin"]), validateMedcin, addMedcin);
router.get("/:id", verifierToken, autoriser(["admin", "infirmier"]), getMedcinById);
router.put("/:id", verifierToken, autoriser(["admin"]), validateMedcin, updateMedcin);
router.delete("/:id", verifierToken, autoriser(["admin"]), deleteMedcin);

export default router;
