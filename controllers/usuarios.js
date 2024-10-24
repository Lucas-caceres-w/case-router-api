const { Op } = require('sequelize');
const Usuarios = require('../models/usuario');
const { transporter } = require('../config/transporter');

const getUsers = async (req, res) => {
   try {
      const usuarios = await Usuarios.findAll();

      return res.status(200).json(usuarios);
   } catch (err) {
      return res.status(503).json(err);
   }
};

const getUser = async (req, res) => {
   const id = await req.params.id;
   try {
      const usuario = await Usuarios.findOne({
         where: {
            id: id,
         },
      });

      const data = {
         name: usuario.name,
         username: usuario.username,
         email: usuario.email,
         password: usuario.password,
         rol: usuario.rol,
      };

      return res.status(200).json(data);
   } catch (err) {
      return res.status(503).json(err);
   }
};

const createUser = async (req, res) => {
   const data = await req.body;
   try {
      const result = await Usuarios.create(data);
      console.log(result);
      return res.status(200).json('usuario creado');
   } catch (err) {
      return res.status(503).json(err);
   }
};

const deleteUser = async (req, res) => {
   const id = await req.params.id;
   console.log(id);
   try {
      const result = await Usuarios.destroy({
         where: {
            id,
         },
      });
      return res.status(200).json('usuario eliminado');
   } catch (err) {
      return res.status(401).json(err);
   }
};

const updateUser = async (req, res) => {
   const data = await req.body;
   const id = await req.params.id;
   console.log(data, id);
   try {
      const result = await Usuarios.update(data, {
         where: {
            id: id,
         },
      });

      return res.status(200).json('usuario actualizado');
   } catch (err) {
      return res.status(503).json(err);
   }
};

const Login = async (req, res) => {
   try {
      const data = await req.body;
      const { user, password } = data;
      const result = await Usuarios.findOne({
         where: {
            [Op.and]: [
               {
                  [Op.or]: [{ email: user }, { username: user }],
               },
               { password: password },
            ],
         },
      });
      if (!result) {
         return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      delete result.dataValues.password;
      
      return res.status(200).json(result);
   } catch (err) {
      console.log(err);
      return res.status(501).json('No autorizado');
   }
};

const Recovery = async (req, res) => {
   const { data } = await req.body;
   let response;
   try {
      const result = await Usuarios.findOne({
         where: {
            email: data,
         },
      });
      console.log(result);
      if (result) {
         const message = {
            from: 'Case route <caseroute@noreply.com>',
            to: data,
            subject: 'Recuperar contraseña | Case Route',
            html: `<article>
                <h2>Recuperacion de contraseña de Case Route:</h2>
                <p>Su contraseña de acceso a case route es: ${result.password}</p>
                <hr/>
                <small>Este correo electrónico no requiere una respuesta.</small>
                <small>Para mas información contactese con un desarrollador</small>
              </article>`,
         };
         const envio = await transporter.mailer.sendMail(message);
         console.log(envio);
         response = 'eviar_mail';
      } else {
         response = 'no_existe';
      }
      return res.status(200).json(response);
   } catch (err) {
      console.log(err);
      return res.status(400).json(err);
   }
};

module.exports = {
   getUsers,
   createUser,
   deleteUser,
   Login,
   updateUser,
   getUser,
   Recovery,
};
