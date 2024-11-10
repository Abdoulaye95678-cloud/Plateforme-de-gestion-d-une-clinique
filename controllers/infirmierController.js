import Infirmier from "../models/Infirmier.js";

// Liste des infirmiers avec pagination
export const infirmierList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const infirmiers = await Infirmier.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
        res.status(200).json({ data: infirmiers });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter un infirmier
export const addInfirmier = async (req, res) => {
    const infirmierInfo = req.body;
    try {
        const result = await Infirmier.create(infirmierInfo);
        res.status(201).json({ message: 'Infirmier créé avec succès', data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir un infirmier par ID
export const getInfirmierById = async (req, res) => {
    const { id } = req.params;
    try {
        const infirmier = await Infirmier.findByPk(id);
        if (infirmier) {
            res.status(200).json({ data: infirmier });
        } else {
            res.status(404).json({ message: 'Infirmier non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un infirmier
export const updateInfirmier = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const infirmier = await Infirmier.findByPk(id);
        if (infirmier) {
            await infirmier.update(updateData);
            res.status(200).json({ message: 'Infirmier mis à jour avec succès', data: infirmier });
        } else {
            res.status(404).json({ message: 'Infirmier non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un infirmier
export const deleteInfirmier = async (req, res) => {
    const { id } = req.params;
    try {
        const infirmier = await Infirmier.findByPk(id);
        if (infirmier) {
            await infirmier.destroy();
            res.status(200).json({ message: 'Infirmier supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Infirmier non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
