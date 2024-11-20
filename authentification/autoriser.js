export default (roles) => {
  return (req, res, next) => {
    console.log("Rôle requis :", roles);
    console.log("Rôle utilisateur :", req.user.role);

    if (!roles.includes(req.user.role)) {
      console.error("Accès refusé. Rôle non autorisé :", req.user.role);
      return res.status(403).json({ message: "Accès interdit. Rôle non autorisé." });
    }

    next();
  };
};
