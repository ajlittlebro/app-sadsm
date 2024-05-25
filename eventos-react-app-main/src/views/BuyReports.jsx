import { useState, useEffect } from "react";
import { Table, Card, Label, TextInput } from "flowbite-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";
import SideBar from "../components/SideBar";
import { useEvents } from "../context/EventsContext"; // Usa el contexto de eventos

const BuyReports = () => {
  const { events, createEvent, salons, clients, packages, getEvents } =
    useEvents(); // Usa el contexto de eventos

  const [inputFecha, setInputFecha] = useState("");
  const [inputLugar, setInputLugar] = useState("");
  const [inputHora, setInputHora] = useState("");
  const [inputSalon, setInputSalon] = useState("");
  const [inputCliente, setInputCliente] = useState("");
  const [inputPaquete, setInputPaquete] = useState("");

  useEffect(() => {
    getEvents(); // Obtener los eventos al montar el componente
  }, [getEvents]); // Dependencia vacía para ejecutar una vez

  const handleSaveEvento = () => {
    // Validar que todos los campos estén llenos
    if (
      !inputCliente ||
      !inputFecha ||
      !inputLugar ||
      !inputHora ||
      !inputSalon ||
      !inputPaquete
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor, complete todos los campos.",
        icon: "error",
      });
      return;
    }

    const newEvento = {
      idCliente: inputCliente,
      Fecha: inputFecha,
      Lugar: inputLugar,
      Hora: inputHora,
      idSalon: inputSalon,
      idPaquete: inputPaquete,
    };

    createEvent(newEvento); // Agregar evento

    console.log(newEvento);

    // Limpiar los campos del formulario después de guardar
    setInputFecha("");
    setInputLugar("");
    setInputHora("");
    setInputSalon("");
    setInputCliente("");
    setInputPaquete("");

    // Sweet alert para guardar
    Swal.fire({
      title: "Evento guardado.",
      text: "El evento ha sido guardado correctamente.",
      icon: "success",
    });
  };

  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const printTableToPdf = () => {
    const doc = new jsPDF();
    const table = document.getElementById("eventosTable");
    if (table) {
      doc.autoTable({ html: table });
      doc.save("historial_pagos_cotizaciones.pdf");
      Swal.fire({
        title: "PDF generado correctamente.",
        text: "Guardalo en tu dispositivo para tener un respaldo.",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error al generar PDF.",
        text: "No se encontró la tabla de eventos.",
        icon: "error",
      });
    }
  };

  const handleTicket = (index) => {
    const evento = events[index];

    Swal.fire({
      title: "Cotización del Evento",
      html: `
        <div>
          <p><strong>Cliente:</strong> ${evento.Nombre}</p>
          <p><strong>Fecha:</strong> ${evento.Fecha}</p>
          <p><strong>Lugar:</strong> ${evento.Lugar}</p>
          <p><strong>Hora:</strong> ${evento.Hora}</p>
          <p><strong>Nombre del Salón:</strong> ${evento.Salon}</p>
          <p><strong>Monto:</strong> ${
            typeof evento.Monto === "number" ? `$${evento.Monto.toFixed(2)}` : evento.Monto
          }
        </div>
      `,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showCloseButton: true,
      showLoaderOnConfirm: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: true,
      focusConfirm: false,
      customClass: {
        confirmButton: "bg-green-500 hover:bg-green-600",
        cancelButton: "bg-gray-500 hover:bg-gray-600",
        closeButton: "bg-red-500 hover:bg-red-600",
      },
    });
  };

  return (
    <>
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex flex-col gap-10">
            <div className="text-center bg-gray-50 p-5 border rounded-xl">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Gestión de Eventos
              </h2>
              <p className="mt-1 text-xl text-gray-600 dark:text-gray-300">
                Asigna eventos a clientes y genera cotizaciones
              </p>
            </div>
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={toggleTable}
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                
              >
                {showTable ? "Ocultar" : "Mostrar"} Eventos
              </button>
            </div>
            <div className="flex">
              <div className={`w-full ${showTable ? 'hidden' : ''}`}>
                <Card className="max-w-2xl mx-auto">
                  <form className="flex flex-col gap-4">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="fecha" value="Fecha" />
                      </div>
                      <TextInput
                        id="fecha"
                        type="date"
                        value={inputFecha}
                        onChange={(e) => setInputFecha(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="lugar" value="Lugar" />
                      </div>
                      <TextInput
                        id="lugar"
                        type="text"
                        value={inputLugar}
                        onChange={(e) => setInputLugar(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="hora" value="Hora" />
                      </div>
                      <TextInput
                        id="hora"
                        type="time"
                        value={inputHora}
                        onChange={(e) => setInputHora(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="nombreSalon" value="Nombre del Salón" />
                      </div>
                      <select
                        id="nombreSalon"
                        value={inputSalon}
                        onChange={(e) => setInputSalon(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Seleccionar salón
                        </option>
                        {salons.map((salon) => (
                          <option key={salon.idSalon} value={salon.idSalon}>
                            {salon.Nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="cliente" value="Cliente" />
                      </div>
                      <select
                        id="cliente"
                        value={inputCliente}
                        onChange={(e) => setInputCliente(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Seleccionar cliente
                        </option>
                        {clients.map((client) => (
                          <option
                            key={client.idCliente}
                            value={client.idCliente}
                          >{`${client.Nombre} `}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="paquete" value="Paquete" />
                      </div>
                      <select
                        id="paquete"
                        value={inputPaquete}
                        onChange={(e) => setInputPaquete(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Seleccionar paquete
                        </option>
                        {packages.map((pkg) => (
                          <option key={pkg.idPaquete} value={pkg.idPaquete}>
                            {pkg.Nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveEvento}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                      Guardar Evento
                    </button>
                  </form>
                </Card>
              </div>
              <div className={`w-full ${!showTable ? 'hidden' : ''}`}>
                <Card className="max-w-7xl mx-auto">
                <button
                    type="button"
                    onClick={printTableToPdf}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Generar PDF
                  </button>
                  <Table id="eventosTable" className="w-full">
                    <Table.Head>
                      <Table.HeadCell>Cliente</Table.HeadCell>
                      <Table.HeadCell>Fecha</Table.HeadCell>
                      <Table.HeadCell>Lugar</Table.HeadCell>
                      <Table.HeadCell>Hora</Table.HeadCell>
                      <Table.HeadCell>Nombre del Salón</Table.HeadCell>
                      <Table.HeadCell>Precio</Table.HeadCell>
                      <Table.HeadCell>Acciones</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {events.map((evento, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{evento.Nombre}</Table.Cell>
                          <Table.Cell>{evento.Fecha}</Table.Cell>
                          <Table.Cell>{evento.Lugar}</Table.Cell>
                          <Table.Cell>{evento.Hora}</Table.Cell>
                          <Table.Cell>{evento.Salon}</Table.Cell>
                          <Table.Cell>
                            {typeof evento.Monto === "number"
                              ? `$${evento.Monto.toFixed(2)}`
                              : evento.Monto}
                          </Table.Cell>
                          <Table.Cell>
                            <button
                              onClick={() => handleTicket(index)}
                              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            >
                              Ver Cotización
                            </button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyReports;
