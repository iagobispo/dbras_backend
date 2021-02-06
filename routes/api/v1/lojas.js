const router = require("express").Router();

const auth = require("../../auth");
const Validation = require("express-validation");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");

const LojaController = require("../../../controllers/LojaController");
const lojaController = new LojaController();

router.get("/", lojaController.index); // testado buscar
//router.get("/:id", Validation(LojaValidation.show), lojaController.show); // testado mostrar
router.get("/:id", Validation(LojaValidation.show), lojaController.show2); // testado mostrar

router.post("/", auth, Validation(LojaValidation.store), lojaController.store); // testado criar
router.put("/:id", auth, LojaValidation.admin, Validation(LojaValidation.update), lojaController.update); // testado editar
router.delete("/:id", auth, LojaValidation.admin, lojaController.remove); // testado deletar

module.exports = router;