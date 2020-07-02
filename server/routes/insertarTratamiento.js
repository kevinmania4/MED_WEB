const express = require("express");
const Tratamiento = require("../models/tratamiento");

const app = express();

app.get("/tratamiento", (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);
    //              Filtrar
    Tratamiento.find({})
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

app.post("/tratamiento", (req, res) => {
    let body = req.body;
    let tratamiento = new Tratamiento({
        descripcion: body.descripcion,
        enfermedad: body.enfermedad,
        usuario: body.usuario,
    });
    tratamiento.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
        });
    });
});

module.exports = app;