const express = require("express");
const app = express();

app.use(require("./Python_Control"));
app.use(require("./aniadirUsuario"));
app.use(require("./aniadirEnfermedad"));
app.use(require("./insertarNuevoSintoma"));
app.use(require("./registroTratamiento"));
app.use(require("./respuesta"));
app.use(require("./ingresoCredenciales"));
app.use(require("./actualizarEstadoUsuario"));

module.exports = app;