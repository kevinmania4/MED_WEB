const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../models/usuario");

const app = express();

app.get("/registro", (req, res) => {
    res.render("GUIregistro");
    // console.log("registro");
});

app.post("/registrar", (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        cedula: body.cedula,
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.correo,
        contrasenia: body.contrasenia,
        identificacion: body.identificacion,
        perfil: body.perfil,
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.send({ usuario: usuarioDB });
    });
});

//--
/*
app.get("/usuario", (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);
    //              Filtrar
    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                usuarios,
            });
        });
});
app.post("/usuario", (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        cedula: body.cedula,
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.correo,
        contrasenia: body.contrasenia,
        identificacion: body.identificacion,
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        // res.json({
        //     ok: true,
        //     usuario: usuarioDB
        // });
        res.write("<a href='/enfermedad'>Recargar página</a>");
    });
});
*/


module.exports = app;