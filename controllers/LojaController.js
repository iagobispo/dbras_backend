const mongoose = require("mongoose");
const Loja = mongoose.model("Loja");
const Usuario = mongoose.model("Usuario");

class LojaController {

    // GET /
    index(req,res,next){
        Loja.find({  }).select("_id nome cnpj email telefones endereco")
        .then(lojas => res.send({ lojas }))
        .catch(next);
    }

    // GET /:id
    show(req,res,next){
        Loja.findById(req.params.id).select("_id nome cnpj email telefones endereco")
        .then(loja => res.send({ loja }))
        .catch(next);
    }

     // GET /:id user
     show2(req,res,next){
         Loja.find({ usuario_ID: req.params.id })
        //Loja.findById(req.params.id).select("_id nome cnpj email telefones endereco")
        .then(loja => res.send({ loja }))
        .catch(next);
    }

    // POST /
    store(req,res,next){
        const { nome, cnpj, email, telefones, endereco, usuario_ID, permissao } = req.body;
        const loja = new Loja ({ nome, cnpj, email, telefones, endereco, usuario_ID });
        //console.log(nome, cnpj, email, telefones, endereco, usuario)
        loja.save().then(() => res.send({ loja })).catch(next);

        //console.log(req.payload.id)

        Usuario.findById(req.payload.id).then(usuario=> {
            if(!usuario) return res.status(422).send({ error: "Usuario não existe." });
            usuario.permissao = permissao
            usuario.loja = loja._id
            usuario.save().then(() => res.send({ usuario })).catch(next);
        })

    }

    // PUT /:id
    update(req,res,next){
        const { nome, cnpj, email, telefones, endereco } = req.body;
        Loja.findById(req.query.loja).then(loja => {
            if(!loja) return res.status(422).send({ error: "Loja não existe." });

            if( nome ) loja.nome = nome;
            if( cnpj ) loja.cnpj = cnpj; 
            if( email ) loja.email = email;
            if( telefones ) loja.telefones = telefones;
            if( endereco ) loja.endereco = endereco;

            loja.save().then(() => res.send({ loja })).catch(next);

        })
        .catch(next);
    }

    // DELETE /:id
    remove(req,res,next){
        Loja.findById(req.query.loja).then(loja => {
            if(!loja) return res.status(422).send({ error: "Loja não existe." });
            loja.remove().then(() => res.send({ deleted: true })).catch(next);
        })
        .catch(next);
    }

}

module.exports = LojaController;