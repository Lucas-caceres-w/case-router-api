// routes/users.js
const express = require("express");
const { getUsers, createUser, deleteUser } = require("../controllers/index");
const { Login, getUser } = require("../controllers/usuarios");
const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.post("/login", Login);

router.delete("/:id", deleteUser);

module.exports = router;
