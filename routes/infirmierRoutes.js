import express, { Router } from 'express';
import { infirmierList, addInfirmier, getInfirmierById, updateInfirmier, deleteInfirmier } from '../controllers/infirmierController.js';

const route = Router();

// Définir les routes pour les infirmiers
route.get('/', infirmierList); // Lister les infirmiers avec pagination
route.post('/', addInfirmier); // Ajouter un infirmier
route.get('/:id', getInfirmierById); // Obtenir un infirmier par ID
route.put('/:id', updateInfirmier); // Mettre à jour un infirmier
route.delete('/:id', deleteInfirmier); // Supprimer un infirmier

export default route;
