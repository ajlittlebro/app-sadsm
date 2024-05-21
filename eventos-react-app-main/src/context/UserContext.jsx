/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedClientes = localStorage.getItem("clientes");
    const storedEventos = localStorage.getItem("eventos"); // Obtener eventos del almacenamiento local
    return {
      clientes: storedClientes ? JSON.parse(storedClientes) : [],
      eventos: storedEventos ? JSON.parse(storedEventos) : [], // Inicializar eventos desde el almacenamiento local
    };
  });

  const addCliente = (newCliente) => {
    setUser((prevUser) => {
      const updatedClientes = [
        ...prevUser.clientes,
        { ...newCliente, eventos: [] },
      ];
      localStorage.setItem("clientes", JSON.stringify(updatedClientes));
      return { ...prevUser, clientes: updatedClientes };
    });
  };

  const editCliente = (index, updatedCliente) => {
    setUser((prevUser) => {
      const updatedClientes = prevUser.clientes.map((cliente, i) =>
        i === index ? { ...updatedCliente, eventos: cliente.eventos } : cliente
      );
      localStorage.setItem("clientes", JSON.stringify(updatedClientes));
      return { ...prevUser, clientes: updatedClientes };
    });
  };

  const deleteCliente = (index) => {
    setUser((prevUser) => {
      const updatedClientes = prevUser.clientes.filter((_, i) => i !== index);
      localStorage.setItem("clientes", JSON.stringify(updatedClientes));
      return { ...prevUser, clientes: updatedClientes };
    });
  };

  // Nuevo método para agregar evento independiente
  const addEvento = (nuevoEvento) => {
    setUser((prevUser) => {
      const updatedEventos = [...prevUser.eventos, nuevoEvento]; // Agregar evento al array de eventos
      localStorage.setItem("eventos", JSON.stringify(updatedEventos)); // Guardar eventos en el almacenamiento local
      return { ...prevUser, eventos: updatedEventos };
    });
  };

  return (
    <UserContext.Provider
      value={{ user, addCliente, editCliente, deleteCliente, addEvento}}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
