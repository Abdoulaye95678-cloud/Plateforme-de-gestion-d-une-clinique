// Importer tous les modèles
import Facture from "./Facture.js";
import Medcin from "./Medcin.js";
import Medicament from "./Medicament.js";
import Ordonnance from "./Ordonnance.js";
import Patient from "./Patient.js";
import DossierMedical from "./Dossier_Medical.js";
import Infirmier from "./Infirmier.js";
import RendezVous from "./Rendez_vous.js";
import { DataTypes } from "sequelize";
import database from "../config/connexion.js";

// Relations
// Relation un-à-plusieurs entre Patient et Facture
Patient.hasMany(Facture, { foreignKey: "id_patient" });
Facture.belongsTo(Patient, { foreignKey: "id_patient" });

// Relation plusieurs-à-plusieurs entre Patient et Medcin via une table intermédiaire
const PatientMedcin = database.define("PatientMedcin", {}, { timestamps: false });
Patient.belongsToMany(Medcin, { through: PatientMedcin, foreignKey: "id_patient" });
Medcin.belongsToMany(Patient, { through: PatientMedcin, foreignKey: "id_medecin" });

// Relation un-à-plusieurs entre Medcin et RendezVous
Medcin.hasMany(RendezVous, { foreignKey: "id_medecin" });
RendezVous.belongsTo(Medcin, { foreignKey: "id_medecin" });

// Relation un-à-plusieurs entre Patient et RendezVous
Patient.hasMany(RendezVous, { foreignKey: "id_patient" });
RendezVous.belongsTo(Patient, { foreignKey: "id_patient" });

// Relation un-à-plusieurs entre Medcin et Ordonnance
Medcin.hasMany(Ordonnance, { foreignKey: "id_medecin" });
Ordonnance.belongsTo(Medcin, { foreignKey: "id_medecin" });

// Relation un-à-plusieurs entre Patient et Ordonnance
Patient.hasMany(Ordonnance, { foreignKey: "id_patient" });
Ordonnance.belongsTo(Patient, { foreignKey: "id_patient" });

// Relation plusieurs-à-plusieurs entre Ordonnance et Medicament
const OrdonnanceMedicament = database.define(
  "OrdonnanceMedicament",
  {},
  { timestamps: false }
);
Ordonnance.belongsToMany(Medicament, { through: OrdonnanceMedicament, foreignKey: "id_ordonnance" });
Medicament.belongsToMany(Ordonnance, { through: OrdonnanceMedicament, foreignKey: "id_medicament" });

// Relation un-à-plusieurs entre Patient et DossierMedical
Patient.hasMany(DossierMedical, { foreignKey: "id_patient" });
DossierMedical.belongsTo(Patient, { foreignKey: "id_patient" });

// Relation un-à-plusieurs entre Medcin et DossierMedical
Medcin.hasMany(DossierMedical, { foreignKey: "id_medecin" });
DossierMedical.belongsTo(Medcin, { foreignKey: "id_medecin" });

// Table d'association entre Infirmier et Patient
const SuiviPatient = database.define(
  "SuiviPatient",
  {
    id_infirmier: {
      type: DataTypes.INTEGER,
      references: { model: Infirmier, key: "id_infirmier" },
    },
    id_patient: {
      type: DataTypes.INTEGER,
      references: { model: Patient, key: "id_patient" },
    },
  },
  { timestamps: false }
);
Infirmier.belongsToMany(Patient, { through: SuiviPatient, foreignKey: "id_infirmier" });
Patient.belongsToMany(Infirmier, { through: SuiviPatient, foreignKey: "id_patient" });

// Table d'association entre Infirmier et RendezVous
const InfirmierRendezVous = database.define(
  "InfirmierRendezVous",
  {
    id_infirmier: {
      type: DataTypes.INTEGER,
      references: { model: Infirmier, key: "id_infirmier" },
    },
    id_rendez_vous: {
      type: DataTypes.INTEGER,
      references: { model: RendezVous, key: "id_rendez_vous" },
    },
  },
  { timestamps: false }
);
Infirmier.belongsToMany(RendezVous, { through: InfirmierRendezVous, foreignKey: "id_infirmier" });
RendezVous.belongsToMany(Infirmier, { through: InfirmierRendezVous, foreignKey: "id_rendez_vous" });

// Export des modèles avec relations
export {
  Facture,
  Medcin,
  Medicament,
  Ordonnance,
  Patient,
  DossierMedical,
  Infirmier,
  RendezVous,
  SuiviPatient,
  InfirmierRendezVous,
};
