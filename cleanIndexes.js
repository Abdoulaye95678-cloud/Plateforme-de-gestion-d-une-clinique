import database from "./config/connexion.js";

(async () => {
  try {
    // Définir le nom de la table et le préfixe des index
    const tableName = "medcins";
    const baseIndexName = "email";

    // Parcourir les index doublons de `email_2` à `email_63`
    for (let i = 61; i <= 63; i++) {
      const indexName = `${baseIndexName}_${i}`;
      console.log(`Tentative de suppression de l'index : ${indexName}`);
      await database.query(`ALTER TABLE ${tableName} DROP INDEX ${indexName}`);
      console.log(`Index '${indexName}' supprimé avec succès.`);
    }

    console.log("Tous les index en doublon ont été supprimés avec succès.");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la suppression des index :", error.message);
    process.exit(1);
  }
})();
