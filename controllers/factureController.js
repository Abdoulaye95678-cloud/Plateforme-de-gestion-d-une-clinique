import Facture from "../models/Facture.js";
import { validationResult } from "express-validator";

// Lister les factures
export const factureList = async (req, res) => {
  try {
    const factures = await Facture.findAll();
    res.status(200).json({ data: factures });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des factures.", error });
  }
};

// Ajouter une facture
export const addFacture = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const facture = await Facture.create(req.body);
    res.status(201).json({ message: "Facture créée avec succès.", data: facture });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la facture.", error });
  }
};

// Obtenir une facture par ID
export const getFactureById = async (req, res) => {
  try {
    const facture = await Facture.findByPk(req.params.id);
    if (facture) {
      res.status(200).json({ data: facture });
    } else {
      res.status(404).json({ message: "Facture non trouvée." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la facture.", error });
  }
};

// Mettre à jour une facture
export const updateFacture = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const facture = await Facture.findByPk(id);
    if (!facture) {
      return res.status(404).json({ message: "Facture non trouvée." });
    }

    await facture.update(req.body);
    res.status(200).json({ message: "Facture mise à jour avec succès.", data: facture });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la facture.", error: error.message });
  }
};


// Supprimer une facture
export const deleteFacture = async (req, res) => {
  try {
    const facture = await Facture.findByPk(req.params.id);
    if (facture) {
      await facture.destroy();
      res.status(200).json({ message: "Facture supprimée avec succès." });
    } else {
      res.status(404).json({ message: "Facture non trouvée." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la facture.", error });
  }
};
