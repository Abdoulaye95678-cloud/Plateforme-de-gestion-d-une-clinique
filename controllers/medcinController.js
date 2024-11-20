import Medcin from "../models/Medcin.js";
import { validationResult } from "express-validator";

// Lister les médecins avec pagination
export const medcinList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const medcins = await Medcin.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      total: medcins.count,
      page: parseInt(page),
      pages: Math.ceil(medcins.count / limit),
      data: medcins.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des médecins.", error: error.message });
  }
};

// Ajouter un nouveau médecin
export const addMedcin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const medcinInfo = req.body;

    // Vérifier si un médecin existe déjà avec cet email
    const existingMedcin = await Medcin.findOne({ where: { email: medcinInfo.email } });
    if (existingMedcin) {
      return res.status(400).json({ message: "Un médecin avec cet email existe déjà." });
    }

    const medcin = await Medcin.create(medcinInfo);
    res.status(201).json({ message: "Médecin créé avec succès", data: medcin });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du médecin.", error: error.message });
  }
};

// Obtenir un médecin par ID
export const getMedcinById = async (req, res) => {
  const { id } = req.params;

  try {
    const medcin = await Medcin.findByPk(id);
    if (medcin) {
      res.status(200).json({ data: medcin });
    } else {
      res.status(404).json({ message: "Médecin non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du médecin.", error: error.message });
  }
};

// Mettre à jour un médecin
export const updateMedcin = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updateData = req.body;
    const medcin = await Medcin.findByPk(id);

    if (medcin) {
      await medcin.update(updateData);
      res.status(200).json({ message: "Médecin mis à jour avec succès", data: medcin });
    } else {
      res.status(404).json({ message: "Médecin non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du médecin.", error: error.message });
  }
};

// Supprimer un médecin
export const deleteMedcin = async (req, res) => {
  const { id } = req.params;

  try {
    const medcin = await Medcin.findByPk(id);

    if (medcin) {
      await medcin.destroy();
      res.status(200).json({ message: "Médecin supprimé avec succès." });
    } else {
      res.status(404).json({ message: "Médecin non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du médecin.", error: error.message });
  }
};
