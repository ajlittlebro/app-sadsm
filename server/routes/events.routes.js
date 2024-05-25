import { Router } from "express";
import {
  getEventById,
  getEvents,
  updateEvent,
  deleteEvent,
  createEvent,
  getSalons,
  getClients,
  getPackages
} from "../controllers/events.controllers.js";

const router = Router();

router.get("/crud/events", getEvents);
router.get("/crud/events/:id", getEventById);
router.post("/crud/events", createEvent);
router.put("/crud/events/:id", updateEvent);
router.delete("/crud/events/:id", deleteEvent);
router.get("/crud/salons", getSalons);
router.get("/crud/clients", getClients);
router.get("/crud/packages", getPackages);

export default router;