import { DataTypes } from 'sequelize';
import database from '../config/connexion.js';

const Ordonnance = database.define('Ordonnance', {
  Id_ordonnance: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Date_emission: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Notes: {
    type: DataTypes.TEXT
  },
  Id_medecin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Medcins', // Assurez-vous d'utiliser le nom correct du modèle
      key: 'Id_medecin'
    }
  },
  Id_patient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Patients', // Assurez-vous d'utiliser le nom correct du modèle
      key: 'Id_patient'
    }
  }
});

export default Ordonnance;
