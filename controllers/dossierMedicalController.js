import DossierMedical from "../models/Dossier_Medical.js";
import { validationResult } from "express-validator";

// Lister les dossiers médicaux avec pagination
export const dossierMedicalList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Valeurs par défaut pour page et limite
  const offset = (page - 1) * limit;

  try {
    const dossiers = await DossierMedical.findAndCountAll({
      limit: parseInt(limit), // Limite de résultats par page
      offset: parseInt(offset), // Décalage
    });

    res.status(200).json({
      total: dossiers.count, // Nombre total de dossiers
      page: parseInt(page), // Page actuelle
      pages: Math.ceil(dossiers.count / limit), // Nombre total de pages
      data: dossiers.rows, // Dossiers pour cette page
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des dossiers médicaux.", error: error.message });
  }
};

// Ajouter un dossier médical
export const addDossierMedical = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const dossier = await DossierMedical.create(req.body);
    res.status(201).json({ message: "Dossier médical créé avec succès.", data: dossier });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du dossier médical.", error: error.message });
  }
};

// Obtenir un dossier médical par ID
export const getDossierMedicalById = async (req, res) => {
  const { id } = req.params;

  try {
    const dossier = await DossierMedical.findByPk(id);
    if (!dossier) {
      return res.status(404).json({ message: "Dossier médical non trouvé." });
    }
    res.status(200).json({ data: dossier });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du dossier médical.", error: error.message });
  }
};

// Mettre à jour un dossier médical
export const updateDossierMedical = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const dossier = await DossierMedical.findByPk(id);
    if (!dossier) {
      return res.status(404).json({ message: "Dossier médical non trouvé." });
    }

    await dossier.update(req.body);
    res.status(200).json({ message: "Dossier médical mis à jour avec succès.", data: dossier });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du dossier médical.", error: error.message });
  }
};

// Supprimer un dossier médical
export const deleteDossierMedical = async (req, res) => {
  const { id } = req.params;

  try {
    const dossier = await DossierMedical.findByPk(id);
    if (!dossier) {
      return res.status(404).json({ message: "Dossier médical non trouvé." });
    }

    await dossier.destroy();
    res.status(200).json({ message: "Dossier médical supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du dossier médical.", error: error.message });
  }
};
