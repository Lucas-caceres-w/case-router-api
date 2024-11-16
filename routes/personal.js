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
   getCertificaciones,
   deleteCertificacion,
   getOneCertificacion,
   editPersonal,
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

router.get('/certificaciones/:id', getCertificaciones);

router.delete('/certificacion/:id', deleteCertificacion);

router.post('/', addPersonal);

router.get('/:id', getPersonalById);

router.post('/dates', getPersonalByDate);

router.post('/data-import', importPersonal);

router.patch('/:id', updatePersonal);

router.get('/certificacion/:id', getOneCertificacion);

router.patch('/certificacion/:id', editPersonal);

router.delete('/:id', deletePersonal);

router.post('/documento/:id', uploads.single('Blob'), addDocs);

module.exports = router;
