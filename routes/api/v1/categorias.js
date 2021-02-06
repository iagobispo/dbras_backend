const router = require("express").Router();

const CategoriaController = require("../../../controllers/CategoriaController");

const auth = require("../../auth");
const Validation = require("express-validation");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const { CategoriaValidation } = require("../../../controllers/validacoes/categoriaValidation");

const categoriaController = new CategoriaController();

router.get("/", categoriaController.index);
router.get("/disponiveis", categoriaController.indexDisponiveis);
router.get("/:id", Validation(CategoriaValidation.show), categoriaController.show);

router.post("/", auth, Validation(CategoriaValidation.store), categoriaController.store);
router.put("/:id", auth, Validation(CategoriaValidation.update), categoriaController.update);
router.delete("/:id", auth, LojaValidation.admin, Validation(CategoriaValidation.remove), categoriaController.remove);

// ROTAS AO PRODUTO
router.get("/:id/produtos", categoriaController.showProdutos); 
router.put("/:id/produtos", auth, LojaValidation.admin, categoriaController.updateProdutos );

module.exports = router; 