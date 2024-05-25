import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCotizacionesRequest } from "../api/history.api.js";

const CotizacionesContext = createContext();

export const useCotizaciones = () => {
  const context = useContext(CotizacionesContext);
  if (!context) {
    throw new Error("useCotizaciones must be used within a CotizacionesProvider");
  }
  return context;
};

export function CotizacionesProvider({ children }) {
  const [cotizaciones, setCotizaciones] = useState([]);

  const getCotizaciones = useCallback(async () => {
    try {
      const res = await getCotizacionesRequest();
      console.log(res.data); // Añadir este console.log para ver los datos
      setCotizaciones(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCotizaciones();
  }, [getCotizaciones]);

  return (
    <CotizacionesContext.Provider value={{ cotizaciones, getCotizaciones }}>
      {children}
    </CotizacionesContext.Provider>
  );
}
