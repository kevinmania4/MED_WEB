const express = require("express");
const Tratamiento = require("../models/tratamiento");

const app = express();


app.get('/tratamiento', (req, res) => {
    let idEnfermedad = req.query.idE;
    //console.log("GET Tratamiento", idEnfermedad);
    res.render('GUItratamiento', { idEnfermedad });
});

app.post('/ingresaTratamiento', (req, res) => {
    let body = req.body
        //console.log(body.tratamiento);
        //console.log(body.enfermedad);
    let tratamiento = new Tratamiento({
        descripcion: body.tratamiento,
        enfermedad: body.enfermedad,
        usuario: '5f0e8cbcc0b72f4d24f11fbe',
    });
    tratamiento.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.send('Tratamiento agregado');
    });
});

/*
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
*/

module.exports = app;