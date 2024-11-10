import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const DossierMedical = database.define('DossierMedical', {
  id_dossier: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_patient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Patients',
      key: 'Id_patient',
    },
  },
  id_medecin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Medcins',
      key: 'Id_medecin',
    },
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false,
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
