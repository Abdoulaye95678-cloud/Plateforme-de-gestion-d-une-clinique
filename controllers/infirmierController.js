import Infirmier from "../models/Infirmier.js"; // Importer le modèle Infirmier

// Lister tous les infirmiers
export const infirmierList = async (req, res) => {
  try {
    const infirmiers = await Infirmier.findAll(); // Récupérer tous les infirmiers
    res.status(200).json(infirmiers); // Retourner les infirmiers avec un statut HTTP 200
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des infirmiers.", // Message en cas d'erreur
      error,
    });
  }
};

// Ajouter un nouvel infirmier
export const addInfirmier = async (req, res) => {
  try {
    const infirmier = await Infirmier.create(req.body); // Ajouter un nouvel infirmier
    res.status(201).json(infirmier); // Retourner l'infirmier créé avec un statut HTTP 201
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de l'ajout de l'infirmier.", // Message en cas d'erreur
      error,
    });
  }
};

// Obtenir un infirmier par ID
export const getInfirmierById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID depuis les paramètres
  try {
    const infirmier = await Infirmier.findByPk(id); // Trouver l'infirmier par ID
    if (infirmier) {
      res.status(200).json(infirmier); // Retourner l'infirmier si trouvé
    } else {
      res.status(404).json({ message: "Infirmier non trouvé." }); // Message si l'infirmier n'existe pas
    }
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la récupération de l'infirmier.", // Message en cas d'erreur
      error,
    });
  }
};

// Mettre à jour un infirmier
export const updateInfirmier = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID depuis les paramètres
  try {
    const infirmier = await Infirmier.findByPk(id); // Trouver l'infirmier par ID
    if (infirmier) {
      await infirmier.update(req.body); // Mettre à jour l'infirmier
      res.status(200).json({
        message: "Infirmier mis à jour avec succès.", // Message de confirmation
        infirmier,
      });
    } else {
      res.status(404).json({ message: "Infirmier non trouvé." }); // Message si l'infirmier n'existe pas
    }
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour de l'infirmier.", // Message en cas d'erreur
      error,
    });
  }
};

// Supprimer un infirmier
export const deleteInfirmier = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID depuis les paramètres
  try {
    const infirmier = await Infirmier.findByPk(id); // Trouver l'infirmier par ID
    if (infirmier) {
      await infirmier.destroy(); // Supprimer l'infirmier
      res.status(200).json({ message: "Infirmier supprimé avec succès." }); // Message de confirmation
    } else {
      res.status(404).json({ message: "Infirmier non trouvé." }); // Message si l'infirmier n'existe pas
    }
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la suppression de l'infirmier.", // Message en cas d'erreur
      error,
    });
  }
};
