const express = require("express");
const Tratamiento = require("../models/tratamiento");
const { verificaToken, ver_doc } = require("../middlewares/autenticacion");

const app = express();


app.get('/tratamiento', (req, res) => {
    let idEnfermedad = req.query.idE;
    //console.log("GET Tratamiento", idEnfermedad);
    res.render('GUI_Tratamiento', { idEnfermedad });
});

//****************Guardar Tratamiento************************/
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
        res.send(req.token);
    });
});


module.exports = app;