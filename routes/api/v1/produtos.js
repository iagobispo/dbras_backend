const router = require("express").Router();

const ProdutoController = require("../../../controllers/ProdutoController");

const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const Validation = require("express-validation");
const { ProdutoValidation } = require("../../../controllers/validacoes/produtoValidation");
const auth = require("../../auth");
const upload = require("../../../config/multer");
const multer = require("multer");


const produtoController = new ProdutoController(); 

// ADMIN
router.post("/", auth, Validation(ProdutoValidation.store), produtoController.store);
router.put("/:id", auth, LojaValidation.admin, Validation(ProdutoValidation.update), produtoController.update);
router.put("/images/:id",  auth, LojaValidation.admin, Validation(ProdutoValidation.updateImages), multer(upload).array("files", 4), produtoController.updateImages);
router.delete("/:id", auth, LojaValidation.admin, Validation(ProdutoValidation.remove), produtoController.remove);

// CLIENTES/VISITANTES
// router.get("/", Validation(ProdutoValidation.index), produtoController.index);
router.get("/", produtoController.index);
router.get("/disponiveis", produtoController.indexDisponiveis);
router.get("/searchidloja/:search", Validation(ProdutoValidation.search), produtoController.searchidloja);
router.get("/search/:search", produtoController.search);
router.get("/:id", Validation(ProdutoValidation.show), produtoController.show);

router.get("/todos/idloja", Validation(ProdutoValidation.index), produtoController.indexLojaId);
router.get("/disponiveis/lojaid", Validation(ProdutoValidation.indexDisponiveis), produtoController.indexDisponiveisLojasId);

// VARIACOES
router.get("/:id/variacoes", Validation(ProdutoValidation.showVariacoes), produtoController.showVariacoes);

// AVALIACOES
router.get("/:id/avaliacoes", Validation(ProdutoValidation.showAvaliacoes), produtoController.showAvaliacoes);

module.exports = router;