const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let Enfermedad = mongoose.model("Enfermedad");
let Usuario = mongoose.model("Usuario");

let tratamientoSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, "el tratamiento es requerido"],
    },
    enfermedad: { type: Schema.ObjectId, ref: "Enfermedad" },
    usuario: { type: Schema.ObjectId, ref: "Usuario" },
});

tratamientoSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("tratamiento", tratamientoSchema);