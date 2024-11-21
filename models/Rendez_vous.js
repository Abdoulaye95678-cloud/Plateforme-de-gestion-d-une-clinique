import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
//table rendez vous avec les champs
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
      references: { model: "Patients", key: "Id_patient" },
    },
    id_medecin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Medcins", key: "Id_medecin" },
    },
  },
  {
    timestamps: false,
  }
);

export default RendezVous;
