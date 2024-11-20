import express from "express";
import {
  ordonnanceList,
  addOrdonnance,
  getOrdonnanceById,
  updateOrdonnance,
  deleteOrdonnance,
} from "../controllers/ordonnanceController.js";
import { verifierToken } from "../authentification/verifierToken.js";
import autoriser from "../authentification/autoriser.js";

const router = express.Router();

router.get("/", verifierToken, autoriser(["admin", "medcin"]), ordonnanceList);
router.post("/", verifierToken, autoriser(["admin", "medcin"]), addOrdonnance);
router.get("/:id", verifierToken, autoriser(["admin", "medcin"]), getOrdonnanceById);
router.put("/:id", verifierToken, autoriser(["admin", "medcin"]), updateOrdonnance);
router.delete("/:id", verifierToken, autoriser(["admin", "medcin"]), deleteOrdonnance);

export default router;
