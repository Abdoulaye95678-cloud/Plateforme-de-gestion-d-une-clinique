import jwt from "jsonwebtoken";

export const verifierToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant ou non autorisé." });// affichage lorsque le token est manquant
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.CODE_SECRET, (err, decoded) => {
    if (err) {
      console.error("Erreur JWT :", err.message);
      return res.status(403).json({ message: "Token invalide." });// affichage lors d'un token invalide
    }

    console.log("Payload décodé :", decoded);
    req.user = decoded; // Ajoute le rôle et l'ID utilisateur au request
    next();
  });
};
