const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../models/usuario");

const app = express();

app.get("/logeo", (req, res) => {
    res.render("GUIiniciarsesion");
});

app.post("/logeo", (req, res) => {
    let body = req.body;
    console.log(body.contrasenia);
    Usuario.find({ correo: body.correo }, [
        "correo",
        "contrasenia",
        "perfil",
    ]).exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        let vari = "";
        usuarios.forEach(function(dato) {
            dato.contrasenia;
            console.log(dato.contrasenia);
            if (dato.correo == body.correo) {
                console.log("Se encuentra el correo");
                if (dato.contrasenia == body.contrasenia) {
                    vari = dato.perfil;
                    console.log("contraseña igu");
                }
            }
        });

        res.send(vari);
    });
});

module.exports = app;