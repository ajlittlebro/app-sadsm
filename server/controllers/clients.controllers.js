import { pool } from "../db.js";

export const getClientes = async (req, res) => {
  try {
    console.log("Intentando obtener clientes...");
    const [result] = await pool.query(
      "SELECT * FROM cliente ORDER BY idCliente ASC"
    );
    console.log("Resultado de la consulta:", result);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getCliente = async (req, res) => {
  try {
    console.log(`Intentando obtener cliente con id: ${req.params.id}`);
    const [result] = await pool.query(
      "SELECT * FROM cliente WHERE idCliente = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      console.warn(`Cliente con id ${req.params.id} no encontrado`);
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error(`Error al obtener cliente con id ${req.params.id}:`, error);
    return res.status(500).json({ message: error.message });
  }
};

export const createCliente = async (req, res) => {
  try {
    const { Nombre, Correo, Direccion } = req.body;
    console.log("Intentando crear cliente con datos:", { Nombre, Correo, Direccion });
    const [result] = await pool.query(
      "INSERT INTO cliente (Nombre, Correo, Direccion) VALUES (?, ?, ?)",
      [Nombre, Correo, Direccion]
    );
    console.log("Cliente creado con id:", result.insertId);
    res.json({
      id: result.insertId,
      Nombre,
      Correo,
      Direccion,
    });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    console.log(`Intentando eliminar cliente con id: ${req.params.id}`);
    const [result] = await pool.query(
      "DELETE FROM cliente WHERE idCliente = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      console.warn(`Cliente con id ${req.params.id} no encontrado para eliminar`);
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    console.log(`Cliente con id ${req.params.id} eliminado`);
    return res.sendStatus(204);
  } catch (error) {
    console.error(`Error al eliminar cliente con id ${req.params.id}:`, error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCliente = async (req, res) => {
  try {
    console.log(`Intentando actualizar cliente con id: ${req.params.id}`, req.body);
    const [result] = await pool.query(
      "UPDATE cliente SET ? WHERE idCliente = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0) {
      console.warn(`Cliente con id ${req.params.id} no encontrado para actualizar`);
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    console.log(`Cliente con id ${req.params.id} actualizado`, result);
    res.json(result);
  } catch (error) {
    console.error(`Error al actualizar cliente con id ${req.params.id}:`, error);
    return res.status(500).json({ message: error.message });
  }
};
