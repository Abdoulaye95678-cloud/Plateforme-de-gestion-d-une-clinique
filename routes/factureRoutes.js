import express, { Router } from 'express';
import { factureList, addFacture, getFactureById, updateFacture, deleteFacture } from '../controllers/factureController.js';

const route = Router();

// Définir les routes pour les factures
route.get('/', factureList); // Lister les factures avec pagination
route.post('/', addFacture); // Ajouter une nouvelle facture
route.get('/:id', getFactureById); // Obtenir une facture par ID
route.put('/:id', updateFacture); // Mettre à jour une facture
route.delete('/:id', deleteFacture); // Supprimer une facture

export default route;
