import axios from "./axios.js";

export const getClientRequest = () => {
  return axios.get("/crud/clients");
};

export const getClientsRequest = (id) => axios.get(`/crud/clients/${id}`);

export const createClientRequest = (cliente) =>
  axios.post("/crud/clients", cliente);

export const updateClientRequest = (id, cliente) =>
  axios.put(`/crud/clients/${id}`, cliente);

export const deleteClientRequest = (id) =>
  axios.delete(`/crud/clients/${id}`);
