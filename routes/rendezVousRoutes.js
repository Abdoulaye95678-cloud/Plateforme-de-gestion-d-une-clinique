import express, { Router } from 'express';
import { rendezVousList, addRendezVous, getRendezVousById, updateRendezVous, deleteRendezVous } from '../controllers/rendez_vousController.js';

const route = Router();

// Définir les routes pour les rendez-vous
route.get('/', rendezVousList);          // Liste des rendez-vous
route.post('/', addRendezVous);          // Ajouter un rendez-vous
route.get('/:id', getRendezVousById);   // Obtenir un rendez-vous par ID
route.put('/:id', updateRendezVous);    // Mettre à jour un rendez-vous
route.delete('/:id', deleteRendezVous); // Supprimer un rendez-vous

export default route;
