const express = require('express');
const app = express();

app.use(require("./aniadirUsuario"));
app.use(require("./aniadirEnfermedad"));
app.use(require("./insertarNuevoSintoma"));
app.use(require("./registroTratamiento"));
app.use(require("./respuesta"));
app.use(require("./ingresoCredenciales"));




module.exports = app;