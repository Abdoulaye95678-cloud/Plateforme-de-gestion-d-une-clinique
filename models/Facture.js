import { DataTypes } from "sequelize";
import database from "../config/connexion.js";
import Patient from "./Patient.js";
//table facture avec les champs
const Facture = database.define('Facture', {
  Id_facture: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Date_emission: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Montant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  Statut_paiement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_patient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'Id_patient',
    },
  },
});

export default Facture;
