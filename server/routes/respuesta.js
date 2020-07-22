const express = require("express");
const Relacion = require("../models/relacion");
const Sintoma = require("../models/sintoma");
const Tratamiento = require("../models/tratamiento");

const app = express();
var arreglo2 = [];
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
        Tratamiento.find({ enfermedad: id_respuesta }, (err, res2) => {
            //console.log(res2);
            res2.forEach((fin) => {
                console.log(fin.descripcion);

            });
            res.send({ tratamientosRes: res2 });
        });

    });

});

/*
let busca = (id_sintoma) => {

    Relacion.find({ sintoma: id_sintoma }).exec((err, respuesta) => {
        if (err) {
            return res.status(400).send(err);
        }
        console.log(respuesta);
        respuesta.forEach((d) => {
            console.log("E-->", d.enfermedad);
            arreglo2.push(d.enfermedad);

        });
        console.log("AA-->", arreglo2);
        return arreglo2
    });

}
*/




/*
            /*
            respuesta.forEach((dato) => {
                console.log("E:->", dato.enfermedad);
                Tratamiento.find({ enfermedad: dato.enfermedad }).exec((err, tratamientoRes) => {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    tratamientoRes.forEach((info) => {
                        console.log(info.descripcion);
                        //mensaje += info.descripcion;
                        //mensaje += '\n';
                        //res.send(info.descripcion)
                        //console.log("M:", );    
                    });
                    //console.log("M:", mensaje);
                    //res.send(mensaje);
                });
                //console.log('MM:', mensaje);
                //res.send(mensaje);

            });
            
    /*
    sintomas.forEach((id_sintoma) => {
        console.log("S:->", id_sintoma);
        //console.log("BUSCA__-->", busca(id_sintoma));
        Relacion.find({ sintoma: id_sintoma }, function(err, result) {
            console.log(result);
            result.forEach((respuesta) => {
                console.log("E:-->", respuesta.enfermedad);
                arreglo2.push(respuesta.enfermedad);
            });
        });
        console.log("AA--->", arreglo2);
    });
    console.log("--->", arreglo2);
    




-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
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
}); *
*/

module.exports = app;