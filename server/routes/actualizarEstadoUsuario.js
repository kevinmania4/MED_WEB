const express = require("express");
const Verusuarios = require("../models/usuario");
const _ = require("underscore");
const app = express();

app.get("/usuarios", (req, res) => {
    res.render("GUI_Usuarios");
});

//**************Buscar Usuarios*********************/
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


app.post("/elegirus", (req, res) => {
    let body = req.body;
    Verusuarios.find({ perfil: body.opcion }).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.send({ usuarios: usuariosDB });
    });
});

//*************Actualizar Usuario**********************/
app.put("/elegirus/:id", (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["estado"]);

    Verusuarios.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.send({ usuarios: usuarioDB });
    });
});
module.exports = app;