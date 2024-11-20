import express from "express";
import {
  dossierMedicalList,
  addDossierMedical,
  getDossierMedicalById,
  updateDossierMedical,
  deleteDossierMedical,
} from "../controllers/dossierMedicalController.js";
import {
  validateDossierMedicalCreation,
  validateDossierMedicalUpdate,
} from "../validations/dossierMedicalValidation.js";
import { verifierToken } from "../authentification/verifierToken.js";
import autoriser from "../authentification/autoriser.js";

const route = express.Router();

// Routes sécurisées
route.get("/", verifierToken, autoriser(["admin", "medcin"]), dossierMedicalList);
route.post("/", verifierToken, autoriser(["admin", "medcin"]), validateDossierMedicalCreation, addDossierMedical);
route.get("/:id", verifierToken, autoriser(["admin", "medcin"]), getDossierMedicalById);
route.put("/:id", verifierToken, autoriser(["admin", "medcin"]), validateDossierMedicalUpdate, updateDossierMedical);
route.delete("/:id", verifierToken, autoriser(["admin"]), deleteDossierMedical);

export default route;
