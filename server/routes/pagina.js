const express = require('express');
const app = express();
/*
app.get('/', (req, res) => {
    res.render('index', {
        nombre: 'KeVin rAmiRez',
        pagina: 'Home'
    });
});
*/
app.get('/', (req, res) => {
    res.render('casa', {});
});

app.get('/enfermedad', (req, res) => {
    res.render('enfermedad', {});
});


module.exports = app;