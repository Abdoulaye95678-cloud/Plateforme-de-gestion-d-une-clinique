import express, { Router } from 'express';
import { dossierMedicalList, addDossierMedical, getDossierMedicalById, updateDossierMedical, deleteDossierMedical } from '../controllers/dossierMedicalController.js';

const route= Router();

route.get('/', dossierMedicalList);
route.post('/', addDossierMedical);
route.get('/:id', getDossierMedicalById);
route.put('/:id', updateDossierMedical);
route.delete('/:id', deleteDossierMedical);

export default route;
