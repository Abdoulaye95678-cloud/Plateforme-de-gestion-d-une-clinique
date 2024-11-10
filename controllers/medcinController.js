import Medcin from "../models/Medcin.js";

// Liste des médecins avec pagination
export const medcinList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const medcins = await Medcin.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
        res.status(200).json({ data: medcins });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter un nouveau médecin
export const addMedcin = async (req, res) => {
    const medcinInfo = req.body;
    try {
        const result = await Medcin.create(medcinInfo);
        res.status(201).json({ message: 'Médecin créé avec succès', data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
            res.status(404).json({ message: 'Médecin non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un médecin
export const updateMedcin = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const medcin = await Medcin.findByPk(id);
        if (medcin) {
            await medcin.update(updateData);
            res.status(200).json({ message: 'Médecin mis à jour avec succès', data: medcin });
        } else {
            res.status(404).json({ message: 'Médecin non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un médecin
export const deleteMedcin = async (req, res) => {
    const { id } = req.params;
    try {
        const medcin = await Medcin.findByPk(id);
        if (medcin) {
            await medcin.destroy();
            res.status(200).json({ message: 'Médecin supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Médecin non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
