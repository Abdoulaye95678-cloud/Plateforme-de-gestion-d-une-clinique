import Facture from "../models/Facture.js";

// Liste des factures avec pagination
export const factureList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const factures = await Facture.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
        res.status(200).json({ data: factures });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter une nouvelle facture
export const addFacture = async (req, res) => {
    try {
        const facture = await Facture.create(req.body);
        res.status(201).json(facture);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la facture', error });
    }
};

// Obtenir une facture par ID
export const getFactureById = async (req, res) => {
    const { id } = req.params;
    try {
        const facture = await Facture.findByPk(id);
        if (facture) {
            res.status(200).json({ data: facture });
        } else {
            res.status(404).json({ message: 'Facture non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour une facture
export const updateFacture = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const facture = await Facture.findByPk(id);
        if (facture) {
            await facture.update(updateData);
            res.status(200).json({ message: 'Facture mise à jour avec succès', data: facture });
        } else {
            res.status(404).json({ message: 'Facture non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une facture
export const deleteFacture = async (req, res) => {
    const { id } = req.params;
    try {
        const facture = await Facture.findByPk(id);
        if (facture) {
            await facture.destroy();
            res.status(200).json({ message: 'Facture supprimée avec succès' });
        } else {
            res.status(404).json({ message: 'Facture non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
