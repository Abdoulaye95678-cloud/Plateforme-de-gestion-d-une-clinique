import Patient from "../models/Patient.js";

// Liste des patients avec pagination
export const patientList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const patients = await Patient.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
        res.status(200).json({ data: patients });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter un nouveau patient
export const addPatient = async (req, res) => {
    const patientInfo = req.body;
    try {
        const result = await Patient.create(patientInfo);
        res.status(201).json({ message: 'Patient créé avec succès', data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
            res.status(404).json({ message: 'Patient non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un patient
export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const patient = await Patient.findByPk(id);
        if (patient) {
            await patient.update(updateData);
            res.status(200).json({ message: 'Patient mis à jour avec succès', data: patient });
        } else {
            res.status(404).json({ message: 'Patient non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un patient
export const deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findByPk(id);
        if (patient) {
            await patient.destroy();
            res.status(200).json({ message: 'Patient supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Patient non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
