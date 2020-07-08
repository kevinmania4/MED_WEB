const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.render("casa", {});
});

app.get("/registro", (req, res) => {
    res.render("GUIregistro", {});
});
/*
<<<<<<< HEAD
app.get("/enfermedad", (req, res) => {
    res.render("GUI_Enfermedad", {});
});


=======
app.get("/sintoma", (req, res) => {
    res.render("GUIsintomatologia", {});
});
app.get("/tratamiento", (req, res) => {
    res.render("GUItratamiento", {});
});
>>>>>>> 71f948773bfc9697cae98d5a916c6f32171b2017
// app.get('/casa', (req, res) => {
//     res.render('casa', {});
// });
*/
module.exports = app;