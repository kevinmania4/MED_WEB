const mongoose = require('mongoose');
//let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let Sintoma = mongoose.model('Sintoma');
let Enfermedad = mongoose.model('Enfermedad');


let relacionSchema = new Schema({
    sintoma: { type: Schema.ObjectId, ref: "Sintoma" },
    enfermedad: { type: Schema.ObjectId, ref: "Enfermedad" }
});

//usurarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

module.exports = mongoose.model('Relacion', relacionSchema);