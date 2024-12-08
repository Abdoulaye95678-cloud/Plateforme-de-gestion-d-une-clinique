import Infirmier from "../models/Infirmier.js"; // Importer le modèle Infirmier

// Lister tous les infirmiers avec pagination
export const infirmierList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Valeurs par défaut pour la pagination
  const offset = (page - 1) * limit;

  try {
    const infirmiers = await Infirmier.findAndCountAll({
      limit: parseInt(limit), // Limite des résultats par page
      offset: parseInt(offset), // Décalage pour la page actuelle
    });

    res.status(200).json({
      total: infirmiers.count, // Nombre total d'infirmiers
      page: parseInt(page), // Page actuelle
      pages: Math.ceil(infirmiers.count / limit), // Nombre total de pages
      data: infirmiers.rows, // Infirmiers pour cette page
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des infirmiers.", // Message en cas d'erreur
      error: error.message,
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
      error: error.message,
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
      error: error.message,
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
      error: error.message,
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
      error: error.message,
    });
  }
};
