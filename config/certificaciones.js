const { Personal, Certificacion } = require('../models');
const { transporter } = require('./transporter');
const { format } = require('date-fns');

const sendNotification = async (listadoPersonal) => {
   const mailOptions = {
      from: 'caseroute_support@gmail.com',
      to: 'mtorres.mjr@gmail.com',
      subject: `Listado de certificaciones próximas a vencer o vencidas`,
      text: `Hola Melvin, a continuación se muestra el listado 
      del personal con certificaciones vencidas o próximas a vencer:\n\n${listadoPersonal}`,
   };

   try {
      await transporter.mailer.sendMail(mailOptions); // Cambié `transporter.mailer.sendMail` por `transporter.sendMail`
      console.log('Correo enviado con el listado de certificaciones vencidas.');
   } catch (error) {
      console.error('Error enviando correo:', error);
   }
};

const isCertificacionVencida = (fechaExpiracion) => {
   const now = new Date();
   const expirationDate = new Date(fechaExpiracion);
   const diffInDays = (expirationDate - now) / (1000 * 60 * 60 * 24); // Diferencia en días

   if (diffInDays < 0) {
      return 'vencida';
   } else if (diffInDays <= 60) {
      return 'próxima a vencer';
   }
   return null;
};

const verificarCertificaciones = async () => {
   try {
      const personales = await Personal.findAll({
         include: Certificacion,
      });

      let listadoPersonal = '';

      for (const personal of personales) {
         let certificacionesVencidas = '';

         for (const certificacion of personal.certificacions) {
            const estado = isCertificacionVencida(
               certificacion.fechaExpiracion
            );

            if (estado) {
               certificacionesVencidas += `   - Certificación: ${
                  certificacion.tipoDocumento
               }${
                  certificacion.tipoDocumento === 'licencia'
                     ? ` de conducir, categoria-${certificacion.tipoEvaluacion}`
                     : ''
               } (${estado}), vence el: ${format(
                  new Date(certificacion.fechaExpiracion),
                  'dd/MM/yyyy'
               )}\n`;
            }
         }

         if (certificacionesVencidas) {
            listadoPersonal += `Personal: ${personal.name} ${personal.secondName}\n${certificacionesVencidas}\n`;
         }
      }

      if (!listadoPersonal) {
         console.log('No hay certificaciones vencidas o próximas a vencer.');
         return;
      }

      await sendNotification(listadoPersonal);
   } catch (error) {
      console.error('Error verificando certificaciones:', error);
   }
};

module.exports = {
   verificarCertificaciones,
};
