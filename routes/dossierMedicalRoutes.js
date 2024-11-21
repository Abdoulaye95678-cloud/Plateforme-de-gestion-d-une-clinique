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

<<<<<<< HEAD
// Routes sécurisées
route.get("/", verifierToken, autoriser(["admin", "medcin"]), dossierMedicalList);
route.post("/", verifierToken, autoriser(["admin", "medcin"]), validateDossierMedicalCreation, addDossierMedical);
route.get("/:id", verifierToken, autoriser(["admin", "medcin"]), getDossierMedicalById);
route.put("/:id", verifierToken, autoriser(["admin", "medcin"]), validateDossierMedicalUpdate, updateDossierMedical);
route.delete("/:id", verifierToken, autoriser(["admin"]), deleteDossierMedical);
=======
route.get('/', dossierMedicalList);//recupérer la liste de tout les dossiers médicaux
route.post('/', addDossierMedical);//Ajout d'un dossier medicale
route.get('/:id', getDossierMedicalById);///recupérer la liste de tout les dossiers médicaux par ID
route.put('/:id', updateDossierMedical);// mise a jour du dossier medical
route.delete('/:id', deleteDossierMedical);// supprimer le dossier medical
>>>>>>> Abdoulaye_branch1

export default route;
