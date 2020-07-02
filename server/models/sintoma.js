const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;


let sintomaSchema = new Schema({

    descripcion: {
        type: String,
        required: [true, 'la descripcion es requerida'],
        unique: true
    }
});

sintomaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

module.exports = mongoose.model('Sintoma', sintomaSchema);