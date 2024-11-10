import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const RendezVous = database.define('RendezVous', {
  id_rendez_vous: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  date: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  heure: { 
    type: DataTypes.TIME, 
    allowNull: false 
  },
  motif: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  statut: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  id_patient: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: 'Patients', key: 'Id_patient' } // Exactement comme dans votre base de données
  
  },
  id_medecin: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { 
      model: 'Medcins', // Assurez-vous d'utiliser le nom correct de la table pour `Medcin`
      key: 'Id_medecin' 
    }
  }
  
}, {
  timestamps: false
});

export default RendezVous;
