const { Op } = require("sequelize");
const Usuarios = require("../models/usuario");

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
    return res.status(200).json("usuario creado");
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
    return res.status(200).json("usuario eliminado");
  } catch (err) {
    return res.status(401).json(err);
  }
};

const Login = async (req, res) => {
  try {
    const data = await req.body;
    const { user, password } = data.credentials;
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
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    delete result.dataValues.password;

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(501).json("No autorizado");
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  Login,
  getUser,
};
