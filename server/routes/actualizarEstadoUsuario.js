const express = require("express");
const Verusuarios = require("../models/usuario");
const app = express();

app.get("/verus", (req, res) => {
    res.render("GUIusuarios");
});
app.post("/verusuarios", (req, res) => {
    Verusuarios.find({}).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.send({ usuarios: usuariosDB });
    });
});

module.exports = app;