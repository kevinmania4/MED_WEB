const express = require("express");
const Relacion = require("../models/relacion");
const Sintoma = require("../models/sintoma");
const Tratamiento = require("../models/tratamiento");

const app = express();

app.get('/paciente', (req, res) => {
    res.render('GUI_Paciente');
});

app.get('/respuestaSintoma', (req, res) => {
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
app.post('/responder', (req, res) => {
    let body = req.body
    let sintomas = body.sintomas;
    mensaje = '';
    sintomas.forEach((id_sintoma) => {
        Relacion.find({ sintoma: id_sintoma }).exec((err, respuesta) => {
            if (err) {
                return res.status(400).send(err);
            }
            respuesta.forEach((dato) => {
                console.log(dato.enfermedad);
                Tratamiento.find({ enfermedad: dato.enfermedad }).exec((err, tratamientoRes) => {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    tratamientoRes.forEach((info) => {
                        console.log(info.descripcion);
                        mensaje += info.descripcion;
                        mensaje += '\n';
                        //res.send(info.descripcion)
                        //console.log("M:", );    
                    });
                    //console.log("M:", mensaje);
                    //res.send(mensaje);
                });
                //console.log('MM:', mensaje);
                //res.send(mensaje);

            });
        });
    });
    //console.log('MM:', mensaje);
    /*
    for (let i = 0; i < sintomas.length; i++) {
        console.log("S:", sintomas[i]);


    }
    */


});




/*
    mensaje = '';
    mensaje += 'Enfermedad01';
    mensaje += 'primera recomedacion';
    mensaje += 'Doctor Juan------';
    mensaje += 'recomiendo tomr reposo todo el dia';
    res.send(mensaje);


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
*/

module.exports = app;