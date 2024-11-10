import express, { Router } from 'express';
import { ordonnanceList, addOrdonnance, getOrdonnanceById, updateOrdonnance, deleteOrdonnance } from '../controllers/ordonnanceController.js';

const route = Router();

// Définir les routes pour les ordonnances
route.get('/', ordonnanceList); // Lister les ordonnances avec pagination
route.post('/', addOrdonnance); // Ajouter une nouvelle ordonnance
route.get('/:id', getOrdonnanceById); // Obtenir une ordonnance par ID
route.put('/:id', updateOrdonnance); // Mettre à jour une ordonnance
route.delete('/:id', deleteOrdonnance); // Supprimer une ordonnance

export default route;
