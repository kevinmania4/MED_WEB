const express = require('express');
const Enfermedad = require('../models/enfermedad');

const app = express();

app.get('/enfermedad', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);
    //              Filtrar
    Enfermedad.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuarios
            });
        });
});

app.post('/enfermedad', (req, res) => {
    let body = req.body
    console.log(body.name);
    console.log(body.descripcion);
    console.log(body.enfermedad);
    console.log(body);
    /*
        let enfermedad = new Enfermedad({
            descripcion: body.descripcion
        });
        enfermedad.save((err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        });
    */
});


module.exports = app;