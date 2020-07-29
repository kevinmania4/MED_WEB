const express = require("express");
const Relacion = require("../models/relacion");
const Sintoma = require("../models/sintoma");
const Tratamiento = require("../models/tratamiento");
const Enfermedades = require("../models/enfermedad");
const Registro = require("../models/registro");

const { verificaToken, ver_doc } = require("../middlewares/autenticacion");

const app = express();
var arreglo2 = [];

app.get('/paciente', (req, res) => {
    // console.log(req.usuario.nombre);
    // console.log(req.usuario._id);
    // console.log(req.prueba);
    res.render('GUI_Paciente');
});

//************************buscar Sintomas****************************/
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

//************************Buscar Enfermedad y Tratamiento****************************/
app.post('/responder', (req, res) => {
    let body = req.body
    let sintomas = body.sintomas;
    mensaje = '';
    let arreglo2 = []

    Relacion.find({ sintoma: sintomas }, (err, result) => {
        result.forEach((respuesta) => {
            //console.log("E:-->", respuesta.enfermedad);
            arreglo2.push(String(respuesta.enfermedad));
        });
        console.log(arreglo2);
        console.log(arreglo2[0]);
        console.log(typeof(arreglo2[0]));
        let inico = [];
        for (let i = 0; i < arreglo2.length; i++) {
            if (inico.includes(arreglo2[i])) {
                console.log('ya esta');
            } else {
                inico.push(arreglo2[i]);
            }
        }
        console.log(inico);
        let conteo = [];
        inico.forEach((en) => {
            let cont = 0;
            arreglo2.forEach((en2) => {
                if (en == en2) {
                    cont++;
                }

            });
            conteo.push(cont);
            console.log(cont);
        });
        let conteo2 = conteo.slice();
        let ultimo = conteo.length - 1;
        let mayor = conteo.sort()[ultimo];
        console.log("MAYOR-->", mayor);

        console.log("Conteo-->", conteo);
        console.log("Conteo2-->", conteo2);
        var indices = [];
        var idx = conteo2.indexOf(mayor);
        while (idx != -1) {
            indices.push(idx);
            idx = conteo2.indexOf(mayor, idx + 1);
        }
        console.log("INDICES_>>", indices);
        let id_respuesta = [];
        indices.forEach((d) => {
            console.log("Final-->", inico[d]);
            id_respuesta.push(inico[d]);
        });
        let respuesta_enfermedades = []
        Tratamiento.find({ enfermedad: id_respuesta }, (err, res2) => {
            console.log(res2);
            res2.forEach((fin) => {
                //console.log(fin.descripcion);
                console.log(fin.enfermedad);
                respuesta_enfermedades.push(fin.enfermedad);
            });
            console.log(respuesta_enfermedades);
            Enfermedades.find({ _id: respuesta_enfermedades }, (err, res3) => {
                console.log(res3);
                res.send({ tratamientosRes: res2, enfermedadRes: res3 });
            });
        });
    });
});


//************************Guardar Reporte****************************/
app.post('/GuardaReporte', (req, res) => {
    let body = req.body;
    console.log('EN REGISTRO --_--***');
    console.log(body.usuario);
    console.log(body.sintomas);
    console.log(body.enfermedad);

    let registro = new Registro({
        usuario: body.usuario,
        sintomas: body.sintomas,
        enfermedad: body.enfermedad,
    });
    registro.save((err, registroDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.send("Se guardo en registro");
    });

});

module.exports = app;