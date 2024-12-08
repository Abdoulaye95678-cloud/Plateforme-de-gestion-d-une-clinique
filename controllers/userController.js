import User from "../models/User.js";

export const updateUserProfilePhoto = async (req, res) => {
  const { id } = req.body; // ID de l'utilisateur
  const photoPath = req.file.path; // Chemin du fichier téléchargé

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Mettre à jour le chemin de la photo dans la base de données
    user.photo = photoPath;
    await user.save();

    res.status(200).json({ message: "Photo de profil mise à jour avec succès.", photo: photoPath });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la photo.", error: error.message });
  }
};
