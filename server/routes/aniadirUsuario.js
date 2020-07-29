const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../models/usuario");
const { verificaToken, ver_doc } = require("../middlewares/autenticacion");
const app = express();

app.get("/registro", (req, res) => {
    res.render("GUI_Registro");
});

//****************Guardar Usuario*****************************/
app.post("/registro", (req, res) => {
    let body = req.body;
    let usuario;
    if (body.identificacion == undefined) {
        usuario = {
            cedula: body.cedula,
            nombre: body.nombre,
            apellido: body.apellido,
            correo: body.correo,
            contrasenia: bcrypt.hashSync(body.contrasenia, 10),
            //       identificacion: body.identificacion,
            perfil: body.perfil,
        };
    } else {
        usuario = {
            cedula: body.cedula,
            nombre: body.nombre,
            apellido: body.apellido,
            correo: body.correo,
            contrasenia: bcrypt.hashSync(body.contrasenia, 10),
            identificacion: body.identificacion,
            perfil: body.perfil,
        };
    }
    //console.log(usuario);
    let usuariob = new Usuario(usuario);
    //console.log(usuariob);
    usuariob.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.send({ usuario: usuarioDB });
    });
});

module.exports = app;