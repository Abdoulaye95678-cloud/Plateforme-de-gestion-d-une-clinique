import Medicament from "../models/Medicament.js";
import { validationResult } from "express-validator";

// Lister les médicaments avec pagination
export const medicamentList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Valeurs par défaut pour la pagination
  const offset = (page - 1) * limit;

  try {
    const medicaments = await Medicament.findAndCountAll({
      limit: parseInt(limit), // Nombre d'éléments par page
      offset: parseInt(offset), // Décalage
    });

    res.status(200).json({
      total: medicaments.count, // Nombre total de médicaments
      page: parseInt(page), // Page actuelle
      pages: Math.ceil(medicaments.count / limit), // Nombre total de pages
      data: medicaments.rows, // Médicaments de la page actuelle
    });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération des médicaments.", error: error.message });
  }
};

// Ajouter un nouveau médicament
export const addMedicament = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const medicamentInfo = req.body;
  try {
    const result = await Medicament.create(medicamentInfo);
    res.status(201).json({ message: "Médicament créé avec succès.", data: result });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du médicament.", error: error.message });
  }
};

// Obtenir un médicament par ID
export const getMedicamentById = async (req, res) => {
  const { id } = req.params;
  try {
    const medicament = await Medicament.findByPk(id);
    if (medicament) {
      res.status(200).json({ data: medicament });
    } else {
      res.status(404).json({ message: "Médicament non trouvé." });
    }
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération du médicament.", error: error.message });
  }
};

// Mettre à jour un médicament
export const updateMedicament = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updateData = req.body;
  try {
    const medicament = await Medicament.findByPk(id);
    if (medicament) {
      await medicament.update(updateData);
      res.status(200).json({ message: "Médicament mis à jour avec succès.", data: medicament });
    } else {
      res.status(404).json({ message: "Médicament non trouvé." });
    }
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour du médicament.", error: error.message });
  }
};

// Supprimer un médicament
export const deleteMedicament = async (req, res) => {
  const { id } = req.params;
  try {
    const medicament = await Medicament.findByPk(id);
    if (medicament) {
      await medicament.destroy();
      res.status(200).json({ message: "Médicament supprimé avec succès." });
    } else {
      res.status(404).json({ message: "Médicament non trouvé." });
    }
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la suppression du médicament.", error: error.message });
  }
};
