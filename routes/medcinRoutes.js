import express, { Router } from 'express';
import { medcinList, addMedcin, getMedcinById, updateMedcin, deleteMedcin } from '../controllers/medcinController.js';

const route = Router();

// Définir les routes pour les médecins
route.get('/', medcinList); // Lister les médecins avec pagination
route.post('/', addMedcin); // Ajouter un nouveau médecin
route.get('/:id', getMedcinById); // Obtenir un médecin par ID
route.put('/:id', updateMedcin); // Mettre à jour un médecin
route.delete('/:id', deleteMedcin); // Supprimer un médecin

export default route;
