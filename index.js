import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import database from './config/connexion.js';
import "./models/Relations.js"; // Import relations

// Charger les variables d'environnement
dotenv.config();

// Import des routes
import patientRoutes from './routes/patientRoutes.js';
import factureRoutes from './routes/factureRoutes.js';
import medcinRoutes from './routes/medcinRoutes.js';
import medicamentRoutes from './routes/medicamentRoutes.js';
import ordonnanceRoutes from './routes/ordonnanceRoutes.js';
import dossierMedicalRoutes from './routes/dossierMedicalRoutes.js';
import infirmierRoutes from './routes/infirmierRoutes.js';
import rendezVousRoutes from './routes/rendezVousRoutes.js';

const app = express();

// Configuration des middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Synchronisation de la base de données
database.sync({ force: true })
    .then(() => console.log("La base de données est synchronisée"))
    .catch(error => {
        console.error("Erreur de synchronisation de la base de données:", error);
        process.exit(1); // Sortir du processus si la connexion échoue
    });

// Configuration des routes
app.use('/api/patients', patientRoutes);

app.use('/api/factures', factureRoutes);
app.use('/api/medcins', medcinRoutes);
app.use('/api/medicaments', medicamentRoutes);
app.use('/api/ordonnances', ordonnanceRoutes);
app.use('/api/dossier-medicals', dossierMedicalRoutes);
app.use('/api/infirmiers', infirmierRoutes);
app.use('/api/rendez-vous', rendezVousRoutes);

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
