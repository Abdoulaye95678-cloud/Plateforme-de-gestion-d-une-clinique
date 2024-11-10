import Ordonnance from "../models/Ordonnance.js";

// Liste des ordonnances avec pagination
export const ordonnanceList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const ordonnances = await Ordonnance.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
        res.status(200).json({ data: ordonnances });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter une nouvelle ordonnance
export const addOrdonnance = async (req, res) => {
    const ordonnanceInfo = req.body;
    try {
        const result = await Ordonnance.create(ordonnanceInfo);
        res.status(201).json({ message: 'Ordonnance créée avec succès', data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir une ordonnance par ID
export const getOrdonnanceById = async (req, res) => {
    const { id } = req.params;
    try {
        const ordonnance = await Ordonnance.findByPk(id);
        if (ordonnance) {
            res.status(200).json({ data: ordonnance });
        } else {
            res.status(404).json({ message: 'Ordonnance non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour une ordonnance
export const updateOrdonnance = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const ordonnance = await Ordonnance.findByPk(id);
        if (ordonnance) {
            await ordonnance.update(updateData);
            res.status(200).json({ message: 'Ordonnance mise à jour avec succès', data: ordonnance });
        } else {
            res.status(404).json({ message: 'Ordonnance non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une ordonnance
export const deleteOrdonnance = async (req, res) => {
    const { id } = req.params;
    try {
        const ordonnance = await Ordonnance.findByPk(id);
        if (ordonnance) {
            await ordonnance.destroy();
            res.status(200).json({ message: 'Ordonnance supprimée avec succès' });
        } else {
            res.status(404).json({ message: 'Ordonnance non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
