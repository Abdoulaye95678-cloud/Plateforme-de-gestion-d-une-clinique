import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Patient from "./Patient.js";

const Facture = database.define(
  "Facture",
  {
    id_facture: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date_emission: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    montant: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    statut_paiement: {
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
  },
  {
    tableName: "factures",
    timestamps: true,
    underscored: true,
  }
);

export default Facture;
