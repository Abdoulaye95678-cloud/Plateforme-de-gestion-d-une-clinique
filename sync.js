import User from "./models/User.js";
import bcrypt from "bcryptjs"; // Assurez-vous d'importer bcrypt ou bcryptjs

const deleteUser = async () => {
  try {
    await User.destroy({
      where: { email: "admin@example.com" },
    });

    console.log("Utilisateur supprimé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error.message);
  }
};

const createUser = async () => {
  try {
    // Hacher le mot de passe avant de le sauvegarder
    const hashedPassword = bcrypt.hashSync("admin123", 10);

    await User.create({
      email: "admin@example.com",
      mot_de_passe: hashedPassword,
      role: "admin",
    });

    console.log("Nouvel utilisateur créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error.message);
  }
};

// Supprimer l'utilisateur existant et en recréer un
deleteUser().then(createUser);
