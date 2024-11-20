import express from "express";
import {
  factureList,
  addFacture,
  getFactureById,
  updateFacture,
  deleteFacture,
} from "../controllers/factureController.js";
import {
  validateFactureForAdd,
  validateFactureForUpdate,
} from "../validations/factureValidation.js";
import { verifierToken } from "../authentification/verifierToken.js";
import autoriser from "../authentification/autoriser.js";

const route = express.Router();

// Routes sécurisées pour factures
route.get(
  "/", 
  verifierToken, 
  autoriser(["admin", "medcin", "patient"]), 
  factureList
);
route.post(
  "/", 
  verifierToken, 
  autoriser(["admin", "medcin"]), 
  validateFactureForAdd, // Validation stricte pour la création
  addFacture
);
route.get(
  "/:id", 
  verifierToken, 
  autoriser(["admin", "medcin", "patient"]), 
  getFactureById
);
route.put(
  "/:id", 
  verifierToken, 
  autoriser(["admin", "medcin"]), 
  validateFactureForUpdate, // Validation optionnelle pour la mise à jour
  updateFacture
);
route.delete(
  "/:id", 
  verifierToken, 
  autoriser(["admin"]), // Seuls les admins peuvent supprimer
  deleteFacture
);

export default route;
