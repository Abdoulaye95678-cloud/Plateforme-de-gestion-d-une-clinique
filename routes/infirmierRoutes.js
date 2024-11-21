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
router.get('/', verifierToken, autoriser(['admin']), infirmierList);//pour autoriser l'admin
router.post('/', verifierToken, autoriser(['admin']), validateInfirmier, addInfirmier);// pour autoriser l'admin a ajouter
router.get('/:id', verifierToken, autoriser(['admin']), getInfirmierById);// pour autorisegr l'admin a recuperer ID
router.put('/:id', verifierToken, autoriser(['admin']), validateInfirmier, updateInfirmier);// Mettre a jour infirmier
router.delete('/:id', verifierToken, autoriser(['admin']), deleteInfirmier);// supprimmer infirmier

export default router;
