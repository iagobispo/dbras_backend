const mongoose = require("mongoose");
    Schema= mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const LojaSchema = mongoose.Schema({
    nome: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    email: { type: String },
    telefones: {
        type: [{ type: String }]
    },
    endereco: {
        type: {
            local: { type: String, required: true },
            numero: { type: String, required: true },
            complemento: { type: String },
            bairro: { type: String, required: true },
            cidade: { type: String, required: true },
            CEP: { type: String, required: true }
        },
        required: true
    },
    usuario_ID: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true,"não pode ficar vazia."]
    },
},{ timestamps: true });

LojaSchema.plugin(uniqueValidator, { message: "já está sendo utilizado" });

module.exports = mongoose.model("Loja", LojaSchema);