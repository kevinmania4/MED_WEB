const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../models/usuario");
const { verificaToken, ver_doc } = require("../middlewares/autenticacion");
const app = express();

app.get("/registro", (req, res) => {
    res.render("GUIregistro");
});

app.post("/registro", (req, res) => {
    let body = req.body;
    console.log('EN el registro --->');
    console.log(body.identificacion);
    let usuario = new Usuario({
        cedula: body.cedula,
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.correo,
        contrasenia: bcrypt.hashSync(body.contrasenia, 10),
        identificacion: body.identificacion,
        perfil: body.perfil,
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).send("ERROR:->" + err)
        }
        res.send({ usuario: usuarioDB });
    });
});


module.exports = app;