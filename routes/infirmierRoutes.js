import express from 'express';
import { 
  infirmierList, 
  addInfirmier, 
  getInfirmierById, 
  updateInfirmier, 
  deleteInfirmier 
} from '../controllers/infirmierController.js';
import { validateInfirmier } from '../validations/infirmierValidation.js';
import { verifierToken } from '../authentification/verifierToken.js';
import autoriser from '../authentification/autoriser.js';

const router = express.Router();

// Routes sécurisées
router.get('/', verifierToken, autoriser(['admin']), infirmierList);
router.post('/', verifierToken, autoriser(['admin']), validateInfirmier, addInfirmier);
router.get('/:id', verifierToken, autoriser(['admin']), getInfirmierById);
router.put('/:id', verifierToken, autoriser(['admin']), validateInfirmier, updateInfirmier);
router.delete('/:id', verifierToken, autoriser(['admin']), deleteInfirmier);

export default router;
