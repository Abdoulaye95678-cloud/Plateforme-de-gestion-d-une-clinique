import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
import Patient from "./Patient.js";
import Medcin from "./Medcin.js";
//table dossier médical avec les champs
const DossierMedical = database.define("DossierMedical", {
  id_dossier: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_patient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: "Id_patient",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  id_medecin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Medcin,
      key: "id_medecin",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  symptomes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  diagnostic: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  traitement: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default DossierMedical;
