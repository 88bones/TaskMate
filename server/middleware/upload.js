import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsTasksDir = path.join(__dirname, "../uploads/tasks");
const uploadsUsersDir = path.join(__dirname, "../uploads/users");

if (!fs.existsSync(uploadsTasksDir)) {
  fs.mkdirSync(uploadsTasksDir, { recursive: true });
}
if (!fs.existsSync(uploadsUsersDir)) {
  fs.mkdirSync(uploadsUsersDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // route files to users folder when fieldname is 'photo' (user avatar)
    if (file.fieldname === "photo") {
      cb(null, uploadsUsersDir);
    } else {
      cb(null, uploadsTasksDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|txt|zip|rar/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only images, documents, and archives are allowed."
      )
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

export default upload;
