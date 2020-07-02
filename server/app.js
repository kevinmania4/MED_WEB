require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
//procesa peticiones que llegan
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//incluir rutas de /usuario
<<<<<<< HEAD
app.use(require("./routes/aniadirUsuario"));
app.use(require("./routes/aniadirEnfermedad"));
=======
app.use(require('./routes/aniadirUsuario'));
app.use(require('./routes/aniadirEnfermedad'));
app.use(require('./routes/insertarNuevoSintoma'));

>>>>>>> 2b59d64ed27744e6533a16efe1c00c8273e604cd

app.use(require("./routes/insertarTratamiento"));
//conexion a la base de dartos

<<<<<<< HEAD
mongoose.connect(
    //"mongodb+srv://kevin:kevin@pruebamongodb-6oz0y.mongodb.net/<dbname>?retryWrites=true&w=majority"
    "mongodb://localhost:27017/proyecto", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },

    (err, res) => {
        if (err) throw err;
        console.log("Base de datos Online!");
    }
);
=======
//mongoose.connect('mongodb+srv://kevin:kevin@pruebamongodb-6oz0y.mongodb.net/<dbname>?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
mongoose.connect('mongodb://localhost:27017/P_Pruebas', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => { //colback

    if (err) throw err;
    console.log('Base de datos Online!');
});
>>>>>>> 2b59d64ed27744e6533a16efe1c00c8273e604cd
//mongodb+srv://kevin:<password>@pruebamongodb-6oz0y.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb://localhost:27017/MED_WEB_BDD
app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});