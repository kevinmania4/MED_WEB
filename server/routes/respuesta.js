const express = require("express");
const Relacion = require("../models/relacion");

const app = express();

app.get("/respuesta", (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    Relacion.find({})
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

app.post("/respuesta", (req, res) => {
    let body = req.body;
    let relacion = new Relacion({
        sintoma: body.sintoma,
        enfermedad: body.enfermedad,
    });
    relacion.save((err, usuarioDB) => {
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

app.get('/paciente', (req, res) => {
    res.render('GUI_Paciente');
});

module.exports = app;