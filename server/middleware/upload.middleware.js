const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, uploadDir);
  },
  filename(req, file, callback) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '-');
    callback(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return callback(new Error('Only PDF, DOC and DOCX files are allowed'));
    }
    return callback(null, true);
  }
});

module.exports = upload;
