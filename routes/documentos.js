const express = require('express');
const {
   uploadDoc,
   getDocs,
   AddDocument,
   getDocsByCasoId,
} = require('../controllers/index');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/pdf_temp');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
   },
});

const uploads = multer({ storage: storage });

router.get('/', getDocs);

router.post('/', uploadDoc);

router.get('/:id', getDocsByCasoId);

router.patch('/:id', uploads.single('Blob'), AddDocument);

module.exports = router;
