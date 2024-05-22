import axios from "./axios.js";

export const getClientsRequest = () => axios.get("/crud/clients");

export const getClientRequest = (id) => axios.get(`/crud/clients/${id}`);

export const createClientRequest = (client) =>
  axios.post("/crud/clients", client);

export const updateClientRequest = (id, client) =>
  axios.put(`/crud/clients/${id}`, client);

export const deleteClientRequest = (id) =>
  axios.delete(`/crud/clients/${id}`);
