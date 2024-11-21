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

// Relations entre tous les modeles
// Relation un-à-plusieurs entre Patient et Facture
Patient.hasMany(Facture, { foreignKey: "Id_patient" });
Facture.belongsTo(Patient, { foreignKey: "Id_patient" });

// Relation plusieurs-à-plusieurs entre Patient et Medcin via la table intermédiaire PatientMedcin
const PatientMedcin = database.define("PatientMedcin", {}, { timestamps: false });
Patient.belongsToMany(Medcin, { through: PatientMedcin, foreignKey: "Id_patient" });
Medcin.belongsToMany(Patient, { through: PatientMedcin, foreignKey: "Id_medecin" });

// Relation un-à-plusieurs entre Medcin et RendezVous
Medcin.hasMany(RendezVous, { foreignKey: "Id_medecin" });
RendezVous.belongsTo(Medcin, { foreignKey: "Id_medecin" });

// Relation un-à-plusieurs entre Patient et RendezVous
Patient.hasMany(RendezVous, { foreignKey: "Id_patient" });
RendezVous.belongsTo(Patient, { foreignKey: "Id_patient" });

// Relation un-à-plusieurs entre Medcin et Ordonnance
Medcin.hasMany(Ordonnance, { foreignKey: "Id_medecin" });
Ordonnance.belongsTo(Medcin, { foreignKey: "Id_medecin" });

// Relation un-à-plusieurs entre Patient et Ordonnance
Patient.hasMany(Ordonnance, { foreignKey: "Id_patient" });
Ordonnance.belongsTo(Patient, { foreignKey: "Id_patient" });

// Relation plusieurs-à-plusieurs entre Ordonnance et Medicament via la table intermédiaire OrdonnanceMedicament
const OrdonnanceMedicament = database.define(
  "OrdonnanceMedicament",
  {},
  { timestamps: false }
);
Ordonnance.belongsToMany(Medicament, { through: OrdonnanceMedicament, foreignKey: "Id_ordonnance" });
Medicament.belongsToMany(Ordonnance, { through: OrdonnanceMedicament, foreignKey: "Id_medicament" });

// Relation un-à-plusieurs entre Patient et DossierMedical
Patient.hasMany(DossierMedical, { foreignKey: "id_patient" });
DossierMedical.belongsTo(Patient, { foreignKey: "id_patient" });

// Relation un-à-plusieurs entre Medcin et DossierMedical
Medcin.hasMany(DossierMedical, { foreignKey: "id_medecin" });
DossierMedical.belongsTo(Medcin, { foreignKey: "id_medecin" });

// Table d'association pour la relation plusieurs-à-plusieurs entre Infirmier et Patient
const SuiviPatient = database.define(
  "SuiviPatient",
  {
    id_infirmier: {
      type: DataTypes.INTEGER,
      references: { model: Infirmier, key: "id_infirmier" },
    },
    id_patient: {
      type: DataTypes.INTEGER,
      references: { model: Patient, key: "Id_patient" },
    },
  },
  { timestamps: false }
);
Infirmier.belongsToMany(Patient, { through: SuiviPatient, foreignKey: "id_infirmier" });
Patient.belongsToMany(Infirmier, { through: SuiviPatient, foreignKey: "id_patient" });

// Table d'association pour la relation plusieurs-à-plusieurs entre Infirmier et RendezVous
const InfirmierRendezVous = database.define(
  "InfirmierRendezVous",
  {
    id_infirmier: {
      type: DataTypes.INTEGER,
      references: { model: Infirmier, key: "id_infirmier" },
    },
    id_rendez_vous: {
      type: DataTypes.INTEGER,
      references: { model: RendezVous, key: "Id_rendez_vous" },
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
