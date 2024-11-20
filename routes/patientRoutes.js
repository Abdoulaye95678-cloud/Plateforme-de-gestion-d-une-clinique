import express from "express";
import {
  patientList,
  addPatient,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";
import { validatePatient } from "../validations/patientValidation.js";
import { verifierToken } from "../authentification/verifierToken.js";

const route = express.Router();

route.get("/", verifierToken, patientList);
route.post("/", verifierToken, validatePatient, addPatient);
route.get("/:id", verifierToken, getPatientById);
route.put("/:id", verifierToken, validatePatient, updatePatient);
route.delete("/:id", verifierToken, deletePatient);

export default route;
