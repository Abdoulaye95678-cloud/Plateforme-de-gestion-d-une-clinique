import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Patient from "./Patient.js";
import Medcin from "./Medcin.js";

const DossierMedical = database.define(
  "DossierMedical",
  {
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
        key: "id_patient",
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
  },
  {
    tableName: "dossier_medicals",
    timestamps: true,
    underscored: true,
  }
);

export default DossierMedical;
