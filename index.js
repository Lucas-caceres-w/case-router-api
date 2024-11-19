const express = require('express');
const app = express();
const errorHandler = require('./utils/middlewares/errorHandle');
const setHeaders = require('./utils/middlewares/setHeaders');
const { verificarCertificaciones } = require('./config/certificaciones.js');
const routes = require('./routes/index.js');
const sequelize = require('./config/connect');
const cron = require('node-cron');
const cors = require('cors');
const Personal = require('./models/personal.js');
const port = process.env.PORT || 3001;

app.use(express.json({ limit: '50mb' }));

app.use(express.static('public'));

app.use(cors());

sequelize
   .sync()
   .then(async () => {
      console.log('Modelos sincronizados con la base de datos');
   })
   .catch((error) => {
      console.error(
         'Error al sincronizar modelos con la base de datos:',
         error
      );
   });

app.use(setHeaders);

app.use('/', routes);

app.use(errorHandler);

cron.schedule('0 10 * * *', async () => {
   console.log('Iniciando verificación de certificaciones...');
   await verificarCertificaciones();
   console.log('Verificación de certificaciones finalizado');
});

app.listen(port, (req, res) => {
   console.log('server on http://localhost:' + port);
});
