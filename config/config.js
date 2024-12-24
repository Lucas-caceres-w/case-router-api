module.exports = {
   development: {
      host: process.env.HOST_DB,
      username: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
      port: process.env.PORT_DB,
      dialect: 'mysql',
   },
   test: {
      username: 'tu_usuario',
      password: 'tu_contraseña',
      database: 'tu_base_de_datos_test',
      host: '127.0.0.1',
      dialect: 'mysql',
      logging: false, // Deshabilitado para pruebas
   },
   production: {
      host: process.env.HOST_HOST_DB,
      username: process.env.HOST_USER_DB,
      password: process.env.HOST_PASSWORD_DB,
      database: process.env.HOST_DATABASE,
      port: process.env.HOST_PORT_DB,
      dialect: 'mysql',
   },
};
