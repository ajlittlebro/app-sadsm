import { createContext, useContext, useState, useEffect } from "react";
import {
  getClientRequest,
  getClientsRequest,
  createClientRequest,
  updateClientRequest,
  deleteClientRequest,
} from "../api/clients.api.js";

const ClientsContext = createContext();

export const useClients = () => {
  const context = useContext(ClientsContext);

  if (!context) {
    throw new Error("useClients must be used within a ClientsProvider");
  }

  return context;
};

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const res = await getClientsRequest();
      setClients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createClient = async (client) => {
    try {
      await createClientRequest(client);
      await getClients(); // Obtener la lista actualizada de clientes
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClient = async (id) => {
    try {
      const res = await deleteClientRequest(id);
      if (res.status === 204) {
        setClients(clients.filter((client) => client.idCliente !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getClient = async (id) => {
    try {
      const res = await getClientRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateClient = async (id, client) => {
    try {
      await updateClientRequest(id, client);
      await getClients(); // Obtener la lista actualizada de clientes
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <ClientsContext.Provider
      value={{
        clients,
        createClient,
        getClients,
        deleteClient,
        getClient,
        updateClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}
