import { pool } from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM cliente ORDER BY idCliente ASC"
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCliente = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM cliente WHERE idCliente = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCliente = async (req, res) => {
  try {
    const { Nombre, Correo, Direccion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO cliente (Nombre, Correo, Direccion) VALUES (?, ?, ?)",
      [Nombre, Correo, Direccion]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      Nombre,
      Correo,
      Direccion,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM cliente WHERE idCliente = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Cliente no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE cliente SET ? WHERE idCliente = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Cliente no encontrado" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
