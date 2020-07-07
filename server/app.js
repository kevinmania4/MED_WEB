require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const hbs = require('hbs');


const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
//procesa peticiones que llegan
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));
hbs.registerPartials('./views/parcials');
app.set('view engine', 'hbs'); //establecer el motor que va a renderizar mi pagina en este caso el Handlebars

app.use(require("./routes/pagina"))

//incluir rutas de /usuario
app.use(require("./routes/aniadirUsuario"));
app.use(require("./routes/aniadirEnfermedad"));
app.use(require("./routes/insertarNuevoSintoma"));
app.use(require("./routes/insertarTratamiento"));
app.use(require("./routes/respuesta"));
//conexion a la base de dartos



mongoose.connect(
    "mongodb+srv://kevin:kevin@pruebamongodb-6oz0y.mongodb.net/MED_WEB_ATLAS?retryWrites=true&w=majority", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    //"mongodb://localhost:27017/MED_WEB_BDD", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },

    (err, res) => {
        if (err) throw err;
        console.log("Base de datos Online!");
    }
);
//mongodb+srv://kevin:<password>@pruebamongodb-6oz0y.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb://localhost:27017/MED_WEB_BDD

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});