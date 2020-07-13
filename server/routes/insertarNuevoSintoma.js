const express = require('express');
const Sintoma = require('../models/sintoma');

const app = express();
app.get('/sintoma', (req, res) => {
    let id_enfermedad = req.params.idEnfermedad;
    let desde = req.query.desde || 0;
    desde = Number(desde);
    console.log(id_enfermedad);
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
        //let id = body.id;
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
        /*
        res.json({
            ok: true,
            usuario: usuarioDB
        });
        */
        res.write("<a href='/sintoma'>Recargar página</a>");
    });
});
//--------------------------AJAX
app.get('/nuevoS', (req, res) => {
    let idEnfermedad = req.query.idE;
    console.log('En nuevos:');
    console.log(idEnfermedad);
    res.render('GUIsintomatologia');
});

app.get('/sintomas/:idE', (req, res) => {
    let id_enfermedad = req.params.idE;
    console.log(id_enfermedad);
    res.render('GUIsintomatologia');
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
module.exports = app;