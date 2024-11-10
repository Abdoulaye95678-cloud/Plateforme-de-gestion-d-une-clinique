import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Medcin = database.define('Medcin', {
  Id_medecin: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  Nom_medecin: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  Prenom_medecin: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  Specialisation: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  Num_tel: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  Salle_consultation: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  Email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true, 
    validate: { isEmail: true }
  }
});

export default Medcin;
