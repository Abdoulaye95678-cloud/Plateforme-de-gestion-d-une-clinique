import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
//table medicament avec les champs
const Medicament = database.define('Medicament', {
  Id_medicament: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  Nom_medicament: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  Description: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  Dosage: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
});

export default Medicament;
