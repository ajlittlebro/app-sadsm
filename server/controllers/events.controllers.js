import { pool } from "../db.js";

// Obtener todos los eventos
export const getEvents = async (req, res) => {
  try {
    const query = `
      SELECT evento.*, cotizacion.Monto
      FROM evento
      LEFT JOIN cotizacion ON evento.idEvento = cotizacion.idEvento
      ORDER BY evento.idEvento ASC
    `;
    const [result] = await pool.query(query);
    res.json(result);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return res.status(500).json({ message: error.message });
  }
};


// Obtener un evento por ID
export const getEventById = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM evento WHERE idEvento = ?", [req.params.id]);
    if (result.length === 0) return res.status(404).json({ message: "Evento no encontrado" });
    res.json(result[0]);
  } catch (error) {
    console.error("Error al obtener evento:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo evento
// Crear un nuevo evento
export const createEvent = async (req, res) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
  
    try {
      const { Fecha, Lugar, Hora, idSalon, idCliente, idPaquete } = req.body;
  
      // Obtener el nombre del salón
      const [salonResult] = await connection.query("SELECT Nombre FROM salon WHERE idSalon = ?", [idSalon]);
      if (salonResult.length === 0) {
        await connection.rollback();
        return res.status(404).json({ message: "Salón no encontrado" });
      }
      const NombreSalon = salonResult[0].Nombre;
  
      // Obtener el nombre del cliente
      const [clienteResult] = await connection.query("SELECT Nombre FROM cliente WHERE idCliente = ?", [idCliente]);
      if (clienteResult.length === 0) {
        await connection.rollback();
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
      const NombreCliente = `${clienteResult[0].Nombre}`;
  
      // Obtener el paquete y su precio
      const [paqueteResult] = await connection.query("SELECT Nombre, Precio FROM paquete WHERE idPaquete = ?", [idPaquete]);
      if (paqueteResult.length === 0) {
        await connection.rollback();
        return res.status(404).json({ message: "Paquete no encontrado" });
      }
      const { Nombre: NombrePaquete, Precio: Monto } = paqueteResult[0];
  
      // Insertar en la tabla de eventos
      const Descripcion = "Descripción aleatoria del evento";
      const [eventoResult] = await connection.query(
        "INSERT INTO evento (Nombre, Descripcion, Fecha, Hora, Lugar, Salon) VALUES (?, ?, ?, ?, ?, ?)",
        [NombreCliente, Descripcion, Fecha, Hora, Lugar, NombreSalon]
      );
      const idEvento = eventoResult.insertId;
  
      // Insertar en la tabla de pagos
      const FechaPago = new Date();
      const FormaDePago = "Forma de pago aleatoria";
      const [pagoResult] = await connection.query(
        "INSERT INTO pago (Fecha, Monto, `Forma_de_Pago`) VALUES (?, ?, ?)",
        [FechaPago, Monto, FormaDePago]
      );
      const idPago = pagoResult.insertId;
  
      // Insertar en la tabla de cotizaciones
      await connection.query(
        "INSERT INTO cotizacion (idCliente, idEvento, Fecha, Monto) VALUES (?, ?, ?, ?)",
        [idCliente, idEvento, FechaPago, Monto]
      );
  
      await connection.commit();
  
      res.json({
        idEvento,
        NombreCliente,
        Descripcion,
        Fecha,
        Hora,
        Lugar,
        NombreSalon,
        Monto,
        FechaPago,
        FormaDePago
      });
    } catch (error) {
      await connection.rollback();
      console.error("Error al crear evento:", error);
      return res.status(500).json({ message: error.message });
    } finally {
      connection.release();
    }
  };
  

// Obtener todos los salones
export const getSalons = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM salon ORDER BY idSalon ASC");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener salones:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Obtener todos los clientes
export const getClients = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM cliente ORDER BY idCliente ASC");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Obtener todos los paquetes
export const getPackages = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM paquete ORDER BY idPaquete ASC");
    res.json(result);
  } catch (error) {
    console.error("Error al obtener paquetes:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un evento
export const deleteEvent = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM evento WHERE idEvento = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Evento no encontrado" });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un evento
export const updateEvent = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE evento SET ? WHERE idEvento = ?", [req.body, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Evento no encontrado" });
    res.json(result);
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    return res.status(500).json({ message: error.message });
  }
};
