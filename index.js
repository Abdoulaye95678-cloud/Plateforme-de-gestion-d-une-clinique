// Importation des modules nécessaires
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import database from './config/connexion.js'; // Connexion à la base de données
import './models/Relations.js'; // Charger les relations des modèles Sequelize

// Charger les variables d'environnement
dotenv.config();

// Importation des routes
import patientRoutes from './routes/patientRoutes.js';
import factureRoutes from './routes/factureRoutes.js';
import medcinRoutes from './routes/medcinRoutes.js';
import medicamentRoutes from './routes/medicamentRoutes.js';
import ordonnanceRoutes from './routes/ordonnanceRoutes.js';
import dossierMedicalRoutes from './routes/dossierMedicalRoutes.js';
import infirmierRoutes from './routes/infirmierRoutes.js';
import rendezVousRoutes from './routes/rendezVousRoutes.js';
import authRoutes from './routes/authRoute.js';
 // Routes pour l'authentification

// Initialisation de l'application Express
const app = express();

// Configuration des middlewares globaux
app.use(cors()); // Autoriser les requêtes Cross-Origin
app.use(helmet()); // Sécuriser les en-têtes HTTP
app.use(compression()); // Compresser les réponses HTTP pour améliorer les performances
app.use(bodyParser.json()); // Parse les corps de requête JSON
app.use(bodyParser.urlencoded({ extended: false })); // Parse les corps URL-encoded

// Middleware de journalisation (optionnel mais utile pour suivre les requêtes)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Synchronisation avec la base de données
database.sync({ alter: true }) // Utiliser "alter: true" pour éviter de perdre des données (au lieu de force: true)
    .then(() => console.log('La base de données est synchronisée'))
    .catch(error => {
        console.error('Erreur de synchronisation de la base de données:', error);
        process.exit(1); // Arrêter l'application en cas d'erreur critique
    });

// Configuration des routes principales
app.use('/api/auth', authRoutes); // Routes pour l'authentification
app.use('/api/patients', patientRoutes); // Routes pour les patients
app.use('/api/factures', factureRoutes); // Routes pour les factures
app.use('/api/medcins', medcinRoutes); // Routes pour les médecins
app.use('/api/medicaments', medicamentRoutes); // Routes pour les médicaments
app.use('/api/ordonnances', ordonnanceRoutes); // Routes pour les ordonnances
app.use('/api/dossier-medicals', dossierMedicalRoutes); // Routes pour les dossiers médicaux
app.use('/api/infirmiers', infirmierRoutes); // Routes pour les infirmiers
app.use('/api/rendez-vous', rendezVousRoutes); // Routes pour les rendez-vous

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error(`[Erreur] ${err.message}`); // Afficher l'erreur dans la console
    res.status(err.status || 500).json({ 
        message: err.message || 'Erreur interne du serveur',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Masquer la pile d'erreurs en production
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000; // Utiliser le port défini dans le fichier .env ou 5000 par défaut
app.listen(PORT, () => console.log(`✅ Le serveur est en cours d'exécution sur le port ${PORT}`));
