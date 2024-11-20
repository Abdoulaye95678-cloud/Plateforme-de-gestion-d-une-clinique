import database from "./config/connexion.js";
import Patient from "./models/Patient.js";
import Medcin from "./models/Medcin.js";
import Ordonnance from "./models/Ordonnance.js";

(async () => {
  try {
    await database.sync({ alter: true });
    console.log("Base de données synchronisée avec succès.");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la synchronisation :", error.message);
    process.exit(1);
  }
})();
