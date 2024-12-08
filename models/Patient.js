import { DataTypes } from "sequelize";
import database from "../config/connexion.js";

const Patient = database.define(
  "Patient",
  {
    id_patient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom_patient: {
      type: DataTypes.STRING,
      allowNull: false, // Ce champ est obligatoire
    },
    prenom_patient: {
      type: DataTypes.STRING,
      allowNull: false, // Ce champ est obligatoire
    },
    date_naissance: {
      type: DataTypes.DATE,
      allowNull: false, // Ce champ est obligatoire
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false, // Ce champ est obligatoire
    },
    num_tel: {
      type: DataTypes.STRING,
      allowNull: false, // Ce champ est obligatoire
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Ce champ est obligatoire
      unique: true, // L'email doit être unique
      validate: {
        isEmail: true, // Vérifie que c'est un email valide
      },
    },
    assurance_medical: {
      type: DataTypes.STRING,
      allowNull: true, // Ce champ est facultatif
    },
  },
  {
    tableName: "patients",
    timestamps: true,
    underscored: true,
  }
);

export default Patient;
