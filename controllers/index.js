const {
  getUsers,
  createUser,
  deleteUser,
  getUser,
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
};
