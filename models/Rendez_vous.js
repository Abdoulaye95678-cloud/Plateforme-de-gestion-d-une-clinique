import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Patient from "./Patient.js";
import Medcin from "./Medcin.js";

const RendezVous = database.define(
  "RendezVous",
  {
    id_rendez_vous: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    heure: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    motif: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    tableName: "rendez_vous",
    timestamps: false,
    underscored: true,
  }
);

export default RendezVous;
