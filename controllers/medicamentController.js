import Medicament from "../models/Medicament.js";

// Liste des médicaments avec pagination
export const medicamentList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const medicaments = await Medicament.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
        res.status(200).json({ data: medicaments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter un nouveau médicament
export const addMedicament = async (req, res) => {
    const medicamentInfo = req.body;
    try {
        const result = await Medicament.create(medicamentInfo);
        res.status(201).json({ message: 'Médicament créé avec succès', data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
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
            res.status(404).json({ message: 'Médicament non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un médicament
export const updateMedicament = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const medicament = await Medicament.findByPk(id);
        if (medicament) {
            await medicament.update(updateData);
            res.status(200).json({ message: 'Médicament mis à jour avec succès', data: medicament });
        } else {
            res.status(404).json({ message: 'Médicament non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un médicament
export const deleteMedicament = async (req, res) => {
    const { id } = req.params;
    try {
        const medicament = await Medicament.findByPk(id);
        if (medicament) {
            await medicament.destroy();
            res.status(200).json({ message: 'Médicament supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Médicament non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
