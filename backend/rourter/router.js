const express = require('express');
const router = express.Router();

const {
    addDocument,
    getAllDocuments,
    getDocumentByTitle,
    updateDocument,
    deleteDocument,
    addDocumentVersion,
    addCommentToDocument
} = require('../function/Documents-CRUD');

const { registere, login } = require('../function/login-register');
const makeSure = require('../middelware/sure-token');

const multer = require('multer');
const path = require('path');

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); 
  },
  filename: (req, file, cb) => {
    const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only pdf/doc/docx/txt allowed'));
  }
});

// ✅ User routes
router.post('/register', registere);
router.post('/login', login);

// ✅ Document routes
router.post('/documents', makeSure, upload.single('file'), addDocument);
router.get('/documents', makeSure, getAllDocuments);
router.get('/documents/:title', makeSure, getDocumentByTitle);
router.put('/documents/:title', makeSure, updateDocument);
router.delete('/documents/:title', makeSure, deleteDocument);
router.put('/documents/:title/version', makeSure, addDocumentVersion);
router.post('/documents/:title/comment', makeSure, addCommentToDocument);

module.exports = router;
