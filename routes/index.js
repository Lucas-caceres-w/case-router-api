// routes/index.js
const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const casosRoutes = require('./casos');
const DocsRoutes = require('./documentos');
const FotosRoutes = require('./fotos');
const PersonalRoutes = require('./personal');

router.get('/', async (req, res) => {
   res.send('API funcionando');
});

router.use('/users', userRoutes);

router.use('/casos', casosRoutes);

router.use('/documentos', DocsRoutes);

router.use('/fotos', FotosRoutes);

router.use('/personal', PersonalRoutes);

module.exports = router;
