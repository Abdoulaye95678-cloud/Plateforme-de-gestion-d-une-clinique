import express from "express";
import upload from "../middlewares/upload.js";
import { updateUserProfilePhoto } from "../controllers/userController.js";

const router = express.Router();

// Route pour télécharger une photo de profil
router.post("/upload-profile-photo", upload.single("photo"), updateUserProfilePhoto);

export default router;
