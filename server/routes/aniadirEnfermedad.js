const express = require('express');
const Enfermedad = require('../models/enfermedad');
const fetch = require('node-fetch');


const app = express();


app.get('/enfermera', (req, res) => {
    res.render('GUI_Enfermedades')
});

app.get('/enfermedad', (req, res) => {
    //res.render('enfermedad', {});
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
            res.render('GUI_Enfermedades', { usuarios })
                /*
                            res.json({
                                ok: true,
                                usuarios
                            });
                */
                //            res.render('GUI_Enfermedad', {}).json({ usuarios });
        });
});

var respuesta = () => {
    let mensaje = "";
    mensaje += "<html>";
    mensaje += "<body>";
    mensaje += "<script>alert('Enfermedad ingresada')</script>";
    mensaje += "</body>";
    mensaje += "</html>"
    return mensaje;
}

app.post('/enfermedad', (req, res) => {
    let body = req.body

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
        /*
        res.json({
            ok: true,
            usuario: usuarioDB
        });
        */
        //res.render('GUI_Enfermedades', { usuarioDB })
        //res.send(respuesta());
        //res.write("<script>javascript:window.location.reload()</script>");
        res.write("<a href='/enfermedad'>Recargar página</a>");
        //res.
    });

});
//----------------------------------
app.get('/nuevaE', (req, res) => {
    res.render('enfermedad');
});
app.get('/enfermedades', (req, res) => {
    Enfermedad.find({})
        .exec((err, enfermedadesDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.send({ enfermedades: enfermedadesDB });
        });
    //res.send('SI esttaaaaa')
});
app.post('/enfermedades', (req, res) => {
    let body = req.body
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
        res.send('Se guardo');
    });
});

module.exports = app;