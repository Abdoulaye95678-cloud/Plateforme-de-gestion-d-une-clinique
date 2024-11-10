import express, { Router } from 'express';
import { patientList, addPatient, getPatientById, updatePatient, deletePatient } from '../controllers/patientController.js';

const route = Router();

// Définir les routes pour les patients
route.get('/', patientList); // Lister les patients avec pagination
route.post('/', addPatient); // Ajouter un nouveau patient
route.get('/:id', getPatientById); // Obtenir un patient par ID
route.put('/:id', updatePatient); // Mettre à jour un patient
route.delete('/:id', deletePatient); // Supprimer un patient

export default route;
