import express from 'express';
import {
  medicamentList,
  addMedicament,
  getMedicamentById,
  updateMedicament,
  deleteMedicament,
} from '../controllers/medicamentController.js';
import { validateMedicament } from '../validations/medicamentValidation.js';
import { verifierToken } from '../authentification/verifierToken.js';
import autoriser from '../authentification/autoriser.js';

const route = express.Router();

route.get('/', verifierToken, autoriser(['admin', 'medcin', 'infirmier']), medicamentList);
route.post('/', verifierToken, autoriser(['admin', 'medcin']), validateMedicament, addMedicament);
route.get('/:id', verifierToken, autoriser(['admin', 'medcin', 'infirmier']), getMedicamentById);
route.put('/:id', verifierToken, autoriser(['admin', 'medcin']), validateMedicament, updateMedicament);
route.delete('/:id', verifierToken, autoriser(['admin', 'medcin']), deleteMedicament);

export default route;
