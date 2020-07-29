const express = require("express");
const app = express();

app.get("/python", (req, res) => {
    res.render("GUI_AM");
});

let cargaData = () => {
    return new Promise(function(sucess, nosuccess) {
        const { spawn } = require('child_process');
        const pyprog = spawn("python3", ["example.py"]);
        pyprog.stdout.on('data', function(data) {
            sucess(JSON.parse(data.toString()));
        });
        pyprog.stderr.on("data", (data) => {
            nosuccess(data);
        });
    });
};

let respuesta = async() => {
    let resultado = await cargaData();
    //console.log("Resultado DTA-->", resultado);
    return resultado;
};

app.get("/python2", (req, res) => {
    console.log("Respuesta RESP---->", respuesta());
    respuesta()
        .then((resultado) => {
            //console.log('THEN___>--->>', resultado);
            res.send({ res: resultado });
        })
        .catch();
});

module.exports = app;