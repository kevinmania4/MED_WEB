const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.render("casa", {});
});

app.get("/registro", (req, res) => {
    res.render("GUIregistro", {});
});

app.get("/enfermedad", (req, res) => {
    res.render("GUI_Enfermedad", {});
});


// app.get('/casa', (req, res) => {
//     res.render('casa', {});
// });

module.exports = app;