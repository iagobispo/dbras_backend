const router = require("express").Router();
const auth = require("../../auth");
const UsuarioController = require("../../../controllers/UsuarioController");

const Validation = require("express-validation");
const { UsuarioValidation } = require("../../../controllers/validacoes/usuarioValidation");

const usuarioController = new UsuarioController();

router.post("/login", usuarioController.login); // testado
router.post("/registrar", Validation(UsuarioValidation.store), usuarioController.store); // testado
router.put("/", auth, Validation(UsuarioValidation.update), usuarioController.update); // testado
router.delete("/", auth, usuarioController.remove); // testado

router.get("/recuperar-senha", usuarioController.showRecovery); // testado
router.post("/recuperar-senha", usuarioController.createRecovery); // testado
router.get("/senha-recuperada", usuarioController.showCompleteRecovery); // testado
router.post("/senha-recuperada", usuarioController.completeRecovery); // testado

router.get("/", auth, usuarioController.index); // testado
router.get("/:id", auth, Validation(UsuarioValidation.show), usuarioController.show);// testado

module.exports = router;