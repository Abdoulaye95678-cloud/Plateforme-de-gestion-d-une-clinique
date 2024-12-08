import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

// Configuration de la connexion Sequelize avec PostgreSQL
const connexion = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres", // PostgreSQL
  port: DB_PORT || 5432, // Utiliser le port PostgreSQL par défaut si non défini
  logging: console.log, // Affiche les requêtes SQL pour le débogage
  define: {
    timestamps: true, // Active automatiquement `createdAt` et `updatedAt` pour tous les modèles
    underscored: true, // Utilise le style snake_case pour les noms de colonnes et tables
  },
  pool: {
    max: 5, // Nombre maximum de connexions dans le pool
    min: 0, // Nombre minimum de connexions dans le pool
    acquire: 30000, // Durée maximale pour établir une connexion
    idle: 10000, // Durée maximale qu'une connexion peut rester inactive
  },
});

// Vérification de la connexion
const checkDatabaseConnection = async () => {
  try {
    await connexion.authenticate();
    console.log("Connexion à la base de données PostgreSQL réussie.");
  } catch (error) {
    console.error("Impossible de se connecter à PostgreSQL :", error);
  }
};

// Exécuter la vérification de connexion au lancement
checkDatabaseConnection();

export default connexion;
