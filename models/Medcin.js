import { DataTypes } from "sequelize";
import database from "../config/connexion.js";

const Medcin = database.define(
  "Medcin",
  {
    id_medecin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom_medecin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom_medecin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialisation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salle_consultation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: "medcins",
    timestamps: true,
    underscored: true,
  }
);

export default Medcin;
