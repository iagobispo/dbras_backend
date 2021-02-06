const router = require("express").Router();

const ClienteController = require("../../../controllers/ClienteController");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const { ClienteValidation } = require("../../../controllers/validacoes/clienteValidation");
const Validation = require("express-validation");
const auth = require("../../auth");

const clienteController = new ClienteController();

// ADMIN
router.get("/", auth, LojaValidation.admin, Validation(ClienteValidation.index), clienteController.index);
router.get("/search/:search/pedidos", auth, LojaValidation.admin, Validation(ClienteValidation.searchPedidos), clienteController.searchPedidos);
router.get("/search/:search", auth, LojaValidation.admin, Validation(ClienteValidation.search), clienteController.search);
router.get("/admin/:id", auth, LojaValidation.admin, Validation(ClienteValidation.showAdmin), clienteController.showAdmin);
router.get("/admin/:id/pedidos", auth, LojaValidation.admin, Validation(ClienteValidation.showPedidosCliente), clienteController.showPedidosCliente);

router.delete("/admin/:id", auth, LojaValidation.admin, clienteController.removeAdmin);

router.put("/admin/:id", auth, LojaValidation.admin, Validation(ClienteValidation.updateAdmin), clienteController.updateAdmin);

// CLIENTE
router.get("/:id", auth, clienteController.show);

router.post("/", Validation(ClienteValidation.store),  clienteController.store);
router.put("/:id", auth, Validation(ClienteValidation.update), clienteController.update);
router.delete("/:id", auth, clienteController.remove);


module.exports = router;