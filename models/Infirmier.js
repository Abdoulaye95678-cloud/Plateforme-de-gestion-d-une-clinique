import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
//table infermier avec les champs
const Infirmier = database.define('Infirmier', {
  id_infirmier: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_infirmier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom_infirmier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialisation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Infirmier;
