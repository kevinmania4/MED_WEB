const express = require("express");
const app = express();
const { spawn } = require("child_process");

//-----------
app.get("/python", (req, res) => {
    let dataToSend;
    const python = spawn("python3", ["example.py"]);

    python.stdout.on("data", function(data) {
        console.log("Pipe data from python script ...");
        console.log("DATA", data.toString());
        dataToSend = data.toString();
        //res.send(data.toString());
    });

    python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend);
    });

});

module.exports = app;