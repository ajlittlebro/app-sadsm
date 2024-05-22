import { Router } from "express";
import {
  getCliente,
  getClientes,
  updateCliente,
  deleteCliente,
  createCliente,
} from "../controllers/clients.controllers.js";
//import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/crud/clients", getClientes);
router.get("/crud/clients/:id",getCliente);
router.post("/crud/clients", createCliente);
router.put("/crud/clients/:id", updateCliente);
router.delete("/crud/clients/:id", deleteCliente);

export default router;
