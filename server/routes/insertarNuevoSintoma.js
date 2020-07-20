const express = require('express');
const Sintoma = require('../models/sintoma');
const Relacion = require('../models/relacion');

const app = express();

app.get('/sintoma', (req, res) => {
    let idEnfermedad = req.query.idE;
    //console.log("GET Sintomas", idEnfermedad);
    res.render('GUIsintomatologia', { idEnfermedad });
});


app.get('/consultaSintoma', (req, res) => {
    Sintoma.find({})
        .exec((err, sintomas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.send({ sintomas: sintomas });
        });
});
app.post('/sintomaIngresa', (req, res) => {
    let body = req.body
    let sintoma = new Sintoma({
        descripcion: body.descripcion
    });
    sintoma.save((err, sintoma) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.send('Se guardo el sintoma');
    });
});

app.post('/ingresoRelacion', (req, res) => {
    let body = req.body
    let enfermedades = body.enfermedad;
    let sintomas = body.IDsintomas;
    //console.log(enfermedades);
    //console.log(sintomas.length);
    for (let i = 0; i < sintomas.length; i++) {
        //console.log(sintomas[i]);
        let relacion = new Relacion({
            sintoma: sintomas[i],
            enfermedad: enfermedades
        });
        relacion.save((err, relacion) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
        });

    }
    res.send(`/tratamiento?idE=${enfermedades}`);
});


module.exports = app;