import { pool } from '../db.js';

// Obtener todas las cotizaciones con los detalles requeridos
export const getCotizaciones = async (req, res) => {
  try {
    const query = `
      SELECT 
        cotizacion.idCot AS id,
        cotizacion.Fecha AS fecha,
        evento.Salon AS salonDeEventos,
        cliente.Nombre AS cliente,
        cotizacion.Monto AS monto
      FROM cotizacion
      INNER JOIN evento ON cotizacion.idEvento = evento.idEvento
      INNER JOIN cliente ON cotizacion.idCliente = cliente.idCliente
    `;
    const [result] = await pool.query(query);
    res.json(result);
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    return res.status(500).json({ message: error.message });
  }
};
