import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Patient from "./Patient.js";
import Medcin from "./Medcin.js";

const Ordonnance = database.define(
  "Ordonnance",
  {
    id_ordonnance: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date_emission: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_patient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "id_patient",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    id_medecin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medcin,
        key: "id_medecin",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "ordonnances",
    timestamps: true,
    underscored: true,
  }
);

export default Ordonnance;
