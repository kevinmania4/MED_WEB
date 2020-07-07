const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.render("casa", {
        nombre: "KeVin rAmiRez",
        pagina: "Home",
    });
});
app.get("/", (req, res) => {
    res.render("casa", {});
});

app.get("/registro", (req, res) => {
    res.render("GUIregistro", {});
});

// app.get('/casa', (req, res) => {
//     res.render('casa', {});
// });

module.exports = app;