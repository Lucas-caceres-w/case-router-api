const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
  Recovery,
} = require("../controllers/usuarios");
const {
  uploadDoc,
  getDocs,
  AddDocument,
} = require("../controllers/documentos");
const {
  getFotos,
  saveFotos,
  getFotoByCasoId,
  deleteFotos,
} = require("../controllers/fotos");
const {
  getCasos,
  getOne,
  createCaso,
  updateCaso,
  getCasosByDate,
  deleteCaso,
  importData,
  CambiarEstatus,
} = require("../controllers/casos");

module.exports = {
  uploadDoc,
  getDocs,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getCasos,
  getOne,
  createCaso,
  updateCaso,
  getFotoByCasoId,
  deleteCaso,
  getCasosByDate,
  CambiarEstatus,
  getFotos,
  AddDocument,
  importData,
  saveFotos,
  deleteFotos,
};
