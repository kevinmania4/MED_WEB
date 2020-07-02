const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let Enfermedad = mongoose.model('Enfermedad');
let Usuario = mongoose.model('Usuario');


let tratamientoSchema = new Schema({
    descripcion: {
        type: Number,
        required: [true, 'la cedula es requerida']
    },
    enfermedad: { type: Schema.ObjectId, ref: "Enfermedad" },
    usuario: { type: Schema.ObjectId, ref: "Usuario" }
});

usurarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

module.exports = mongoose.model('tratamiento', tratamientoSchema);