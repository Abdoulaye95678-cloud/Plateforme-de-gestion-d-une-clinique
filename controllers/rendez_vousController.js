import RendezVous from "../models/Rendez_vous.js";

// Liste des rendez-vous avec pagination
export const rendezVousList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const rendezVous = await RendezVous.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
        res.status(200).json({ data: rendezVous });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter un nouveau rendez-vous
export const addRendezVous = async (req, res) => {
    const rendezVousInfo = req.body;
    try {
        const result = await RendezVous.create(rendezVousInfo);
        res.status(201).json({ message: 'Rendez-vous créé avec succès', data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
            res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un rendez-vous
export const updateRendezVous = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const rendezVous = await RendezVous.findByPk(id);
        if (rendezVous) {
            await rendezVous.update(updateData);
            res.status(200).json({ message: 'Rendez-vous mis à jour avec succès', data: rendezVous });
        } else {
            res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un rendez-vous
export const deleteRendezVous = async (req, res) => {
    const { id } = req.params;
    try {
        const rendezVous = await RendezVous.findByPk(id);
        if (rendezVous) {
            await rendezVous.destroy();
            res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
