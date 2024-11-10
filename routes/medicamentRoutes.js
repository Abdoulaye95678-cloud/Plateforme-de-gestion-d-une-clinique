import express, { Router } from 'express';
import { medicamentList, addMedicament, getMedicamentById, updateMedicament, deleteMedicament } from '../controllers/medicamentController.js';

const route = Router();

// Définir les routes pour les médicaments
route.get('/', medicamentList); // Lister les médicaments avec pagination
route.post('/', addMedicament); // Ajouter un nouveau médicament
route.get('/:id', getMedicamentById); // Obtenir un médicament par ID
route.put('/:id', updateMedicament); // Mettre à jour un médicament
route.delete('/:id', deleteMedicament); // Supprimer un médicament

export default route;
