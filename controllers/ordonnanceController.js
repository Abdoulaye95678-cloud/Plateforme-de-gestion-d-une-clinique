import Ordonnance from "../models/Ordonnance.js";
import { validationResult } from "express-validator";

export const ordonnanceList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const ordonnances = await Ordonnance.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({ data: ordonnances });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des ordonnances.", error: error.message });
  }
};

export const addOrdonnance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { date_emission, notes, id_medecin, id_patient } = req.body;

  try {
    const ordonnance = await Ordonnance.create({ date_emission, notes, id_medecin, id_patient });
    res.status(201).json({ message: "Ordonnance créée avec succès.", data: ordonnance });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'ordonnance.", error: error.message });
  }
};

export const getOrdonnanceById = async (req, res) => {
  const { id } = req.params;

  try {
    const ordonnance = await Ordonnance.findByPk(id);
    if (!ordonnance) {
      return res.status(404).json({ message: "Ordonnance non trouvée." });
    }
    res.status(200).json({ data: ordonnance });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'ordonnance.", error: error.message });
  }
};

export const updateOrdonnance = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ordonnance = await Ordonnance.findByPk(id);
    if (!ordonnance) {
      return res.status(404).json({ message: "Ordonnance non trouvée." });
    }

    await ordonnance.update(req.body);
    res.status(200).json({ message: "Ordonnance mise à jour avec succès.", data: ordonnance });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'ordonnance.", error: error.message });
  }
};

export const deleteOrdonnance = async (req, res) => {
  const { id } = req.params;

  try {
    const ordonnance = await Ordonnance.findByPk(id);
    if (!ordonnance) {
      return res.status(404).json({ message: "Ordonnance non trouvée." });
    }

    await ordonnance.destroy();
    res.status(200).json({ message: "Ordonnance supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'ordonnance.", error: error.message });
  }
};
