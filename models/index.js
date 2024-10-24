const Fotos = require('./fotos');
const Casos = require('./casos');
const Docs = require('./documentos');
const Personal = require('./personal');
const Certificacion = require('./certificaciones');

// Define las relaciones entre los modelos
Casos.hasOne(Fotos, { foreignKey: 'proyectoId' }); // Añadimos la clave foránea
Fotos.belongsTo(Casos, { foreignKey: 'proyectoId' });

Casos.hasOne(Docs, { foreignKey: 'proyectoId' }); // Añadimos la clave foránea
Docs.belongsTo(Casos, { foreignKey: 'proyectoId' });

Personal.hasMany(Certificacion, { foreignKey: 'personalId' });
Certificacion.belongsTo(Personal, { foreignKey: 'personalId' });

module.exports = {
   Fotos,
   Casos,
   Docs,
   Personal,
   Certificacion,
};
