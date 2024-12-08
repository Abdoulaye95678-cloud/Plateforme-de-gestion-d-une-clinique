import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, mot_de_passe } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const isPasswordValid = bcrypt.compareSync(mot_de_passe, user.mot_de_passe);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.CODE_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Connexion réussie.",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
  }
};
