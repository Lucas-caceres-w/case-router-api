const express = require('express');
const router = express.Router();
const {
   getPersonal,
   getPersonalById,
   addPersonal,
   updatePersonal,
   deletePersonal,
   addDocs,
   getPersonalByDate,
   importPersonal,
} = require('../controllers/index');
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/pdf_personal');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
   },
});

const uploads = multer({ storage: storage });

router.get('/', getPersonal);

router.post('/', addPersonal);

router.get('/:id', getPersonalById);

router.post('/dates', getPersonalByDate);

router.post('/data-import', importPersonal);

router.patch('/:id', updatePersonal);

router.delete('/:id', deletePersonal);

router.post('/documento/:id', uploads.single('Blob'), addDocs);

module.exports = router;
