// Importation des modules nécessaires
import express from "express";
import { fileURLToPath } from 'url';
import path from "path";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import database from "./config/connexion.js"; // Connexion PostgreSQL
import "./models/Relations.js"; // Charger les relations Sequelize

// Charger les variables d'environnement
dotenv.config();

// Importation des routes
import patientRoutes from "./routes/patientRoutes.js";
import factureRoutes from "./routes/factureRoutes.js";
import medcinRoutes from "./routes/medcinRoutes.js";
import medicamentRoutes from "./routes/medicamentRoutes.js";
import ordonnanceRoutes from "./routes/ordonnanceRoutes.js";
import dossierMedicalRoutes from "./routes/dossierMedicalRoutes.js";
import infirmierRoutes from "./routes/infirmierRoutes.js";
import rendezVousRoutes from "./routes/rendezVousRoutes.js";
import authRoutes from "./routes/authRoute.js";

// Initialisation de l'application Express
const app = express();

// Simulation de __dirname dans ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware pour rendre le dossier uploads public
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Configuration des middlewares globaux
app.use(cors()); // Autoriser les requêtes Cross-Origin
app.use(helmet()); // Sécuriser les en-têtes HTTP
app.use(compression()); // Compresser les réponses HTTP pour améliorer les performances
app.use(bodyParser.json()); // Parse les corps de requête JSON
app.use(bodyParser.urlencoded({ extended: false })); // Parse les corps URL-encoded

// Middleware de journalisation
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Synchronisation avec PostgreSQL
database
  .sync({ alter: true }) // Ajuste la structure des tables sans les supprimer
  .then(() => console.log("La base de données PostgreSQL est synchronisée"))
  .catch((error) => {
    console.error("Erreur de synchronisation avec PostgreSQL :", error);
    process.exit(1); // Arrêter l'application en cas d'erreur critique
  });

// Configuration des routes principales
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/factures", factureRoutes);
app.use("/api/medcins", medcinRoutes);
app.use("/api/medicaments", medicamentRoutes);
app.use("/api/ordonnances", ordonnanceRoutes);
app.use("/api/dossier-medicals", dossierMedicalRoutes);
app.use("/api/infirmiers", infirmierRoutes);
app.use("/api/rendez-vous", rendezVousRoutes);

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res, next) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(`[Erreur] ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message || "Erreur interne du serveur",
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Masquer la pile d'erreurs en production
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Le serveur est en cours d'exécution sur le port ${PORT}`)
);
