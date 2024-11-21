import express, { Router } from 'express';
import { dossierMedicalList, addDossierMedical, getDossierMedicalById, updateDossierMedical, deleteDossierMedical } from '../controllers/dossierMedicalController.js';

const route= Router();

route.get('/', dossierMedicalList);//recupérer la liste de tout les dossiers médicaux
route.post('/', addDossierMedical);//Ajout d'un dossier medicale
route.get('/:id', getDossierMedicalById);///recupérer la liste de tout les dossiers médicaux par ID
route.put('/:id', updateDossierMedical);// mise a jour du dossier medical
route.delete('/:id', deleteDossierMedical);// supprimer le dossier medical

export default route;
