import axios from "./axios.js";

export const getEventsRequest = () => axios.get("/crud/events");
export const getEventRequest = (id) => axios.get(`/crud/events/${id}`);
export const createEventRequest = (event) => axios.post("/crud/events", event);
export const updateEventRequest = (id, event) =>
  axios.put(`/crud/events/${id}`, event);
export const deleteEventRequest = (id) => axios.delete(`/crud/events/${id}`);
export const getSalonsRequest = () => axios.get("/crud/salons");
export const getClientsRequest = () => axios.get("/crud/clients");
export const getPackagesRequest = () => axios.get("/crud/packages");