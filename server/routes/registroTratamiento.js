const express = require('express');
const Enfermedad = require('../models/enfermedad');
const fetch = require('node-fetch');


const app = express();


app.get('/tratamiento', (req, res) => {
    res.render('GUI_Enfermedades')
});


module.exports = app;