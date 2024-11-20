import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
import Medcin from "./Medcin.js";
import Patient from "./Patient.js";

const Ordonnance = database.define("Ordonnance", {
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
  id_medecin: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Medcin,
      key: "id_medecin",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  id_patient: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Patient,
      key: "Id_patient",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
});


export default Ordonnance;
