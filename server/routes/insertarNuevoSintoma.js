const express = require('express');
const Sintoma = require('../models/sintoma');

const app = express();

app.get('/sintoma', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    Sintoma.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.render('GUIsintomatologia', { usuarios })
                /*
                res.json({
                    ok: true,
                    usuarios
                });
                */
        });
});

app.post('/sintoma', (req, res) => {
    let body = req.body
    let sintoma = new Sintoma({
        descripcion: body.descripcion
    });
    sintoma.save((err, usuarioDB) => {
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
});

module.exports = app;