const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const Usuario = require("../models/usuario");
const { verificaToken, ver_doc } = require("../middlewares/autenticacion");
const app = express();

app.get("/logeo", (req, res) => {
    res.render("GUI_Iniciarsesion");
});

//*******************Validar Datos********************************/
app.post("/logeo", (req, res) => {
    let body = req.body;
    Usuario.findOne({ correo: body.correo }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!usuarioDB) {
            // return res.status(400).json({
            //     ok: false,
            //     err: { message: "Usuario.. o contraseña incorrectos" },
            // });
            return res.status(400).send("Usuario.. o contraseña incorrectos");
        }

        if (!bcrypt.compareSync(body.contrasenia, usuarioDB.contrasenia)) {
            return res.status(100).json({
                ok: false,
                err: { message: "Usuario o contraseña.. incorrectos" },
            });
        }
        //genera token
        let token = jwt.sign({
                usuario: usuarioDB,
            },
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
        );
        // res.json({ ok: true, usuario: usuarioDB, token });
        res.send({ token, perfil: usuarioDB.perfil, estado: usuarioDB.estado });
    });
});
module.exports = app;