const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let perfilValidos = {
    values: ["USER_ADMIN", "USER_PACIENTE", "USER_MEDICO"],
    message: "{VALUE} no es un perfil válido",
};

let usurarioSchema = new Schema({
    cedula: {
        type: Number,
        required: [true, "la cedula es requerida"],
        unique: true,
    },
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    apellido: {
        type: String,
        required: [true, "El apellido es requerido"],
    },
    correo: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true,
    },
    contrasenia: {
        type: String,
        required: true,
    },
    identificacion: {
        type: Number,
        required: [true, "la cedula es requerida"],
        unique: true,
    },
    perfil: {
        type: String,
        default: "USER_PACIENTE",
        enum: perfilValidos,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

usurarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

/*
usurarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject
}
*/

module.exports = mongoose.model("Usuario", usurarioSchema);