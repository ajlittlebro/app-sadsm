import { Router } from "express";
import {
 getCotizaciones
} from "../controllers/history.controllers.js";

const router = Router();
router.get("/crud/cotizaciones", getCotizaciones);
export default router;