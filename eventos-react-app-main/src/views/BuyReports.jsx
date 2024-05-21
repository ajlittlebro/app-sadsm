import { useState, useContext } from "react";
import { Table, Card, Label, TextInput } from "flowbite-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { UserContext } from "../context/UserContext"; // Importa el contexto de usuario
import Swal from "sweetalert2";

// Components
import SideBar from "../components/SideBar";

const BuyReports = () => {
  const { user, addEvento } = useContext(UserContext); // Usa el contexto de usuario

  const [inputFecha, setInputFecha] = useState("");
  const [inputLugar, setInputLugar] = useState("");
  const [inputHora, setInputHora] = useState("");
  const [inputNombreSalon, setInputNombreSalon] = useState("");
  const [inputClienteIndex, setInputClienteIndex] = useState(0); // Estado para el índice del cliente seleccionado
  const [inputPaquete, setInputPaquete] = useState("económico"); // Estado para el tipo de paquete

  const handleSaveEvento = () => {
    const cliente = user.clientes[inputClienteIndex];
    const newEvento = {
      cliente: cliente.nombre,
      fecha: inputFecha,
      lugar: inputLugar,
      hora: inputHora,
      nombreSalon: inputNombreSalon,
      paquete: inputPaquete,
      precio: calcularPrecio(inputPaquete), // Calcular el precio del paquete
    };
    addEvento(newEvento); // Agregar evento al cliente

    console.log(newEvento);

    // Limpiar los campos del formulario después de guardar
    setInputFecha("");
    setInputLugar("");
    setInputHora("");
    setInputNombreSalon("");
    setInputPaquete("económico");

    //Sweet alert para guardar  
    Swal.fire({
      title: "Evento guardado.",
      text: "El evento ha sido guardado correctamente.",
      icon: "success",
    });
  };

  const calcularPrecio = (paquete) => {
    // Calcular precio según el tipo de paquete
    switch (paquete) {
      case "económico":
        return 10000;
      case "express":
        return 20000;
      case "premium":
        return 30000;
      default:
        return 0;
    }
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
    const evento = user.eventos[index];

    Swal.fire({
      title: "Cotización del Evento",
      html: `
        <div>
          <p><strong>Cliente:</strong> ${evento.cliente}</p>
          <p><strong>Fecha:</strong> ${evento.fecha}</p>
          <p><strong>Lugar:</strong> ${evento.lugar}</p>
          <p><strong>Hora:</strong> ${evento.hora}</p>
          <p><strong>Nombre del Salón:</strong> ${evento.nombreSalon}</p>
          <p><strong>Paquete:</strong> ${evento.paquete}</p>
          <p><strong>Precio:</strong> $${evento.precio.toFixed(2)}</p>
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
            <div className="flex">
              <div className="w-5/12">
                <Card className="max-w-sm">
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
                      <TextInput
                        id="nombreSalon"
                        type="text"
                        value={inputNombreSalon}
                        onChange={(e) => setInputNombreSalon(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="cliente" value="Cliente" />
                      </div>
                      <select
                        id="cliente"
                        value={inputClienteIndex}
                        onChange={(e) => setInputClienteIndex(e.target.value)}
                        required
                      >
                        {user.clientes.map((cliente, index) => (
                          <option key={index} value={index}>
                            {cliente.nombre}
                          </option>
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
                        <option value="económico">Económico</option>
                        <option value="express">Express</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveEvento}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Guardar Evento
                    </button>
                  </form>
                </Card>
              </div>
              <div className="w-full px-10">
                <div className="mb-5 pb-5 flex justify-center gap-10 bg-slate-100 border rounded-lg">
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
                  <Table className="text-center" id="eventosTable">
                    <Table.Head>
                      <Table.HeadCell className="p-2">Cliente</Table.HeadCell>
                      <Table.HeadCell>Lugar</Table.HeadCell>
                      <Table.HeadCell>Hora</Table.HeadCell>
                      <Table.HeadCell>Nombre del Salón</Table.HeadCell>
                      <Table.HeadCell>Paquete</Table.HeadCell>
                      <Table.HeadCell>Precio</Table.HeadCell>
                      <Table.HeadCell>Acciones</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {user.eventos.map((evento, index) => (
                        <Table.Row
                          key={index}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell>{evento.cliente}</Table.Cell>
                          <Table.Cell>{evento.lugar}</Table.Cell>
                          <Table.Cell>{evento.hora}</Table.Cell>
                          <Table.Cell>{evento.nombreSalon}</Table.Cell>
                          <Table.Cell>{evento.paquete}</Table.Cell>
                          <Table.Cell>${evento.precio.toFixed(2)}</Table.Cell>
                          <Table.Cell>
                            <button
                              type="button"
                              onClick={() => handleTicket(index)}
                              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Cotizar
                            </button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyReports;
