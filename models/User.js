import { DataTypes } from "sequelize";
import database from "../config/connexion.js";

const User = database.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "medcin", "patient", "infirmier"),
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING, // Stocker le chemin de la photo
    allowNull: true,
  },
});

export default User;
