const router = require("express").Router();

const PedidoController = require("../../../controllers/PedidoController");

const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const Validation = require("express-validation");
const { PedidoValidation } = require("../../../controllers/validacoes/pedidoValidation");
const auth = require("../../auth");

const pedidoController = new PedidoController();

// ADMIN
router.get("/admin", auth, LojaValidation.admin, Validation(PedidoValidation.indexAdmin), pedidoController.indexAdmin);
router.get("/admin/:id", auth, LojaValidation.admin, Validation(PedidoValidation.showAdmin), pedidoController.showAdmin);

router.delete("/admin/:id", auth, LojaValidation.admin, Validation(PedidoValidation.removeAdmin), pedidoController.removeAdmin);

// -- carrinho
router.get("/admin/:id/carrinho", auth, LojaValidation.admin, Validation(PedidoValidation.showCarrinhoPedidoAdmin), pedidoController.showCarrinhoPedidoAdmin);

// CLIENTE
router.get("/", auth, Validation(PedidoValidation.index), pedidoController.index);
router.get("/:id", auth, Validation(PedidoValidation.show), pedidoController.show);

router.post("/", auth, Validation(PedidoValidation.store), pedidoController.store);
router.delete("/:id", auth, Validation(PedidoValidation.remove), pedidoController.remove);

// -- carrinho
router.get("/:id/carrinho", auth, Validation(PedidoValidation.showCarrinhoPedido), pedidoController.showCarrinhoPedido);

module.exports = router;