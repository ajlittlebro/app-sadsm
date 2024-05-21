import { useState } from "react";
import { Table } from "flowbite-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from 'sweetalert2';

// Components
import SideBar from "../components/SideBar";

// Data
import compradores from "../constants/buyersConfigs";

const BuyHistory = () => {
  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const printTableToPdf = () => {
    const doc = new jsPDF();
    const table = document.getElementById("salesTable");
    if (table) {
      doc.autoTable({ html: table });
      doc.save("historial_ventas.pdf");
      
      Swal.fire({
        title: "PDF generado correctamente.",
        text: "Guardalo en tu dispositivo para tener un respaldo.",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Error al generar PDF.",
        text: "No se encontró la tabla de ventas.",
        icon: "error"
      });
    }
  };

  return (
    <>
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex flex-col gap-10">
            <div className="text-center bg-gray-50 p-5 border rounded-xl">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Historial de ventas
              </h2>
              <p className="mt-1 text-xl text-gray-600 dark:text-gray-300">
                Bienvenido a tu historial de ventas
              </p>
            </div>
            <div className="overflow-x-auto border rounded-xl">
              <div className="pb-5 flex justify-center gap-10 bg-slate-100 border rounded-lg">
                <button
                  onClick={toggleTable}
                  className="mt-4 p-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                >
                  {showTable ? "Ocultar tabla" : "Mostrar tabla"}
                </button>
                <button
                  onClick={() => printTableToPdf()}
                  className="mt-4 p-2 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600"
                >
                  Imprimir PDF
                </button>
              </div>
              {showTable && (
                <div className="mt-5">
                  <Table className="text-center" id="salesTable">
                    <Table.Head>
                      <Table.HeadCell className="p-2">Id</Table.HeadCell>
                      <Table.HeadCell>Fecha</Table.HeadCell>
                      <Table.HeadCell>Salón de eventos</Table.HeadCell>
                      <Table.HeadCell>Fecha del evento</Table.HeadCell>
                      <Table.HeadCell>Cantidad de personas</Table.HeadCell>
                      <Table.HeadCell>Tipo de paquete</Table.HeadCell>
                      <Table.HeadCell>Cliente</Table.HeadCell>
                      <Table.HeadCell>Ganancia total</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {compradores.map((venta) => (
                        <Table.Row
                          key={venta.id}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {venta.id}
                          </Table.Cell>
                          <Table.Cell>{venta.fecha}</Table.Cell>
                          <Table.Cell>{venta.salonDeEventos}</Table.Cell>
                          <Table.Cell>{venta.fechaDelEvento}</Table.Cell>
                          <Table.Cell>{venta.cantidadPersonas}</Table.Cell>
                          <Table.Cell>{venta.tipoPaquete}</Table.Cell>
                          <Table.Cell>{venta.cliente}</Table.Cell>
                          <Table.Cell>
                            ${venta.gananciaTotal.toFixed(2)}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyHistory;
