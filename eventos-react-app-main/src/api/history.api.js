import axios from "./axios.js";

export const getCotizacionesRequest = () => axios.get("/crud/cotizaciones");
