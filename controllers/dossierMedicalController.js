import DossierMedical from "../models/Dossier_Medical.js";

// Lister les dossiers médicaux avec pagination
export const dossierMedicalList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const dossiers = await DossierMedical.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
        res.status(200).json({ data: dossiers });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter un dossier médical
export const addDossierMedical = async (req, res) => {
    const dossierInfo = req.body;
    try {
        const result = await DossierMedical.create(dossierInfo);
        res.status(201).json({ message: 'Dossier médical créé avec succès', data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir un dossier médical par ID
export const getDossierMedicalById = async (req, res) => {
    const { id } = req.params;
    try {
        const dossier = await DossierMedical.findByPk(id);
        if (dossier) {
            res.status(200).json({ data: dossier });
        } else {
            res.status(404).json({ message: 'Dossier médical non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un dossier médical
export const updateDossierMedical = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const dossier = await DossierMedical.findByPk(id);
        if (dossier) {
            await dossier.update(updateData);
            res.status(200).json({ message: 'Dossier médical mis à jour avec succès', data: dossier });
        } else {
            res.status(404).json({ message: 'Dossier médical non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un dossier médical
export const deleteDossierMedical = async (req, res) => {
    const { id } = req.params;
    try {
        const dossier = await DossierMedical.findByPk(id);
        if (dossier) {
            await dossier.destroy();
            res.status(200).json({ message: 'Dossier médical supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Dossier médical non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
