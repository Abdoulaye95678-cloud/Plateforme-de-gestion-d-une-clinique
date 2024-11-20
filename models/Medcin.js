import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

const Medcin = database.define("Medcin", {
  id_medecin: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_medecin: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le nom est obligatoire." },
    },
  },
  prenom_medecin: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le prénom est obligatoire." },
    },
  },
  specialisation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La spécialisation est obligatoire." },
    },
  },
  num_tel: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le numéro de téléphone est obligatoire." },
    },
  },
  salle_consultation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La salle de consultation est obligatoire." },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "L'email doit être valide." },
    },
  },
}, {
  timestamps: true, // Pour gérer les colonnes created_at et updated_at
});

export default Medcin;
