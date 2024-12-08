import Patient from "../models/Patient.js";
import { validationResult } from "express-validator";

// Lister les patients avec pagination
export const patientList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Valeurs par défaut pour la pagination
  const offset = (page - 1) * limit;

  try {
    const patients = await Patient.findAndCountAll({
      limit: parseInt(limit), // Nombre d'éléments par page
      offset: parseInt(offset), // Décalage
    });

    res.status(200).json({
      total: patients.count, // Nombre total de patients
      page: parseInt(page), // Page actuelle
      pages: Math.ceil(patients.count / limit), // Nombre total de pages
      data: patients.rows, // Patients de la page actuelle
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des patients.",
      error: error.message,
    });
  }
};

// Ajouter un nouveau patient
export const addPatient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const patientInfo = req.body;
    const patient = await Patient.create(patientInfo);
    res.status(201).json({ message: "Patient créé avec succès.", data: patient });
  } catch (error) {
    console.error("Erreur lors de la création du patient :", error); // Log détaillé
    res.status(500).json({
      message: "Erreur lors de la création du patient.",
      error: error.message,
    });
  }
};

// Obtenir un patient par ID
export const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findByPk(id);
    if (patient) {
      res.status(200).json({ data: patient });
    } else {
      res.status(404).json({ message: "Patient non trouvé." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du patient.",
      error: error.message,
    });
  }
};

// Mettre à jour un patient
export const updatePatient = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updateData = req.body;
    const patient = await Patient.findByPk(id);

    if (patient) {
      await patient.update(updateData);
      res.status(200).json({ message: "Patient mis à jour avec succès.", data: patient });
    } else {
      res.status(404).json({ message: "Patient non trouvé." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du patient.",
      error: error.message,
    });
  }
};

// Supprimer un patient
export const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findByPk(id);

    if (patient) {
      await patient.destroy();
      res.status(200).json({ message: "Patient supprimé avec succès." });
    } else {
      res.status(404).json({ message: "Patient non trouvé." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du patient.",
      error: error.message,
    });
  }
};
