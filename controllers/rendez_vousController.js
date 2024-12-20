import RendezVous from "../models/Rendez_vous.js";
import { validationResult } from "express-validator";

// Lister les rendez-vous avec pagination
export const rendezVousList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const rendezVous = await RendezVous.findAndCountAll({
      limit: parseInt(limit), // Nombre d'éléments par page
      offset: parseInt(offset), // Décalage
    });

    res.status(200).json({
      total: rendezVous.count, // Nombre total de rendez-vous
      page: parseInt(page), // Page actuelle
      pages: Math.ceil(rendezVous.count / limit), // Nombre total de pages
      data: rendezVous.rows, // Rendez-vous de la page actuelle
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous.", error: error.message });
  }
};

// Ajouter un rendez-vous
export const addRendezVous = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rendezVous = await RendezVous.create(req.body);
    res.status(201).json({ message: "Rendez-vous créé avec succès.", data: rendezVous });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du rendez-vous.", error: error.message });
  }
};

// Obtenir un rendez-vous par ID
export const getRendezVousById = async (req, res) => {
  const { id } = req.params;

  try {
    const rendezVous = await RendezVous.findByPk(id);
    if (rendezVous) {
      res.status(200).json({ data: rendezVous });
    } else {
      res.status(404).json({ message: "Rendez-vous non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du rendez-vous.", error: error.message });
  }
};

// Mettre à jour un rendez-vous
export const updateRendezVous = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rendezVous = await RendezVous.findByPk(id);
    if (rendezVous) {
      await rendezVous.update(req.body);
      res.status(200).json({ message: "Rendez-vous mis à jour avec succès.", data: rendezVous });
    } else {
      res.status(404).json({ message: "Rendez-vous non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du rendez-vous.", error: error.message });
  }
};

// Supprimer un rendez-vous
export const deleteRendezVous = async (req, res) => {
  const { id } = req.params;

  try {
    const rendezVous = await RendezVous.findByPk(id);
    if (rendezVous) {
      await rendezVous.destroy();
      res.status(200).json({ message: "Rendez-vous supprimé avec succès." });
    } else {
      res.status(404).json({ message: "Rendez-vous non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du rendez-vous.", error: error.message });
  }
};
