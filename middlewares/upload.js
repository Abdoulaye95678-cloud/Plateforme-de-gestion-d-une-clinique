import multer from "multer";
import path from "path";

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nom unique pour chaque fichier
  },
});

// Filtrage des types de fichiers
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const isValidMimeType = allowedFileTypes.test(file.mimetype);
  const isValidExtName = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (isValidMimeType && isValidExtName) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images au format JPEG, JPG et PNG sont autorisées."));
  }
};

// Initialiser Multer avec des limites de taille (par ex. 2 Mo)
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 Mo
  fileFilter: fileFilter,
});

export default upload;
