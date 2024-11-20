import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Patient = database.define("Patient", {
  Id_patient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nom_patient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Prenom_patient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Date_naissance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Num_tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Conserve l'unicité
    validate: { isEmail: true },
  },
  Assurance_medical: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Patient;
