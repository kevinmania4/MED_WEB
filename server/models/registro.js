const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let Usuario = mongoose.model("Usuario");

let registroSchema = new Schema({
    usuario: { type: Schema.ObjectId, ref: "Usuario" },
    sintomas: { type: Array, "default": [] },
    enfermedad: { type: String },
});

registroSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("registro", registroSchema);