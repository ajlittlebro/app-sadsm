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
  const [dataLoaded, setDataLoaded] = useState(false);

  const getClients = async () => {
    try {
      if (!dataLoaded) {
        const res = await getClientRequest();
        setClients(res.data);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createClient = async (client) => {
    try {
      const res = await createClientRequest(client);
      setClients([...clients, res.data]);
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
      const res = await getClientsRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateClient = async (id, client) => {
    try {
      const res = await updateClientRequest(id, client);
      setClients(
        clients.map((c) => (c.idCliente === id ? { ...c, ...client } : c))
      );
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
        setDataLoaded,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}
