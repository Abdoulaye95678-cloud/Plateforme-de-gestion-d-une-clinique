import express from "express";
import {
  rendezVousList,
  addRendezVous,
  getRendezVousById,
  updateRendezVous,
  deleteRendezVous,
} from "../controllers/rendez_vousController.js";
import { validateRendezVous, validateRendezVousUpdate } from "../validations/rendezVousValidation.js";
import { verifierToken } from "../authentification/verifierToken.js";
import autoriser from "../authentification/autoriser.js";

const route = express.Router();

route.get("/", verifierToken, autoriser(["admin", "medcin", "infirmier", "patient"]), rendezVousList);
route.post("/", verifierToken, autoriser(["admin", "patient"]), validateRendezVous, addRendezVous);
route.get("/:id", verifierToken, autoriser(["admin", "medcin", "infirmier", "patient"]), getRendezVousById);
route.put("/:id", verifierToken, autoriser(["admin", "medcin", "patient"]), validateRendezVousUpdate, updateRendezVous);
route.delete("/:id", verifierToken, autoriser(["admin", "patient"]), deleteRendezVous);

export default route;
