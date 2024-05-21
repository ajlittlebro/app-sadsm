import { useContext, useState } from "react";
import { Card, Label, TextInput, Table } from "flowbite-react";
import { UserContext } from "../context/UserContext"; // Importa el contexto
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from 'sweetalert2';

// Components
import SideBar from "../components/SideBar";

const Client = () => {
  const { addCliente, editCliente, deleteCliente, user } =
    useContext(UserContext); // Usa los métodos del contexto y accede a los clientes

  const [inputEmail, setInputEmail] = useState("");
  const [inputNombre, setInputNombre] = useState("");
  const [inputDireccion, setInputDireccion] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Estado para el índice del cliente que se está editando

  const handleSave = () => {
    const newCliente = {
      correo: inputEmail,
      nombre: inputNombre,
      direccion: inputDireccion,
    };

    if (editIndex !== null) {
      editCliente(editIndex, newCliente);
      setEditIndex(null); // Reiniciar el índice de edición después de guardar
    } else {
      addCliente(newCliente);
    }

    console.log(newCliente);

    // Limpiar los campos del formulario después de guardar
    setInputEmail("");
    setInputNombre("");
    setInputDireccion("");

    //Sweet alert para guardar
    Swal.fire({
      title: "Cliente guardado.",
      text: "El cliente ha sido guardado correctamente.",
      icon: "success"
    });
  };

  const handleEdit = (index) => {
    const cliente = user.clientes[index];
    setInputEmail(cliente.correo);
    setInputNombre(cliente.nombre);
    setInputDireccion(cliente.direccion);
    setEditIndex(index); // Establecer el índice de edición

    Swal.fire({
      title: "Cliente en edición.",
      text: "La información del cliente se ha cargado en el formulario para su edición.",
      icon: "info"
    });
  };

  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const printTableToPdf = () => {
    const doc = new jsPDF();
    const table = document.getElementById("clientsTable");
    if (table) {
      doc.autoTable({ html: table });
      doc.save("historial_clientes.pdf");
      
      Swal.fire({
        title: "PDF generado correctamente.",
        text: "Guardalo en tu dispositivo para tener un respaldo.",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Error al generar PDF.",
        text: "No se encontró la tabla de clientes.",
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
                Clientes
              </h2>
              <p className="mt-1 text-xl text-gray-600 dark:text-gray-300">
                Bienvenido a tu control de clientes
              </p>
            </div>
            <div className="flex">
              <div className="w-5/12">
                <Card className="max-w-sm">
                  <form className="flex flex-col gap-4">
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="email" value="Correo electrónico" />
                      </div>
                      <TextInput
                        id="email"
                        type="email"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="nombre" value="Nombre completo" />
                      </div>
                      <TextInput
                        id="nombre"
                        type="text"
                        value={inputNombre}
                        onChange={(e) => setInputNombre(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="direccion" value="Dirección" />
                      </div>
                      <TextInput
                        id="direccion"
                        type="text"
                        value={inputDireccion}
                        onChange={(e) => setInputDireccion(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      {editIndex !== null ? "Actualizar" : "Guardar"}
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
                  <Table className="text-center" id="clientsTable">
                    <Table.Head>
                      <Table.HeadCell className="p-2">
                        Número del cliente
                      </Table.HeadCell>
                      <Table.HeadCell className="p-2">
                        Correo electrónico
                      </Table.HeadCell>
                      <Table.HeadCell>Nombre completo</Table.HeadCell>
                      <Table.HeadCell>Dirección</Table.HeadCell>
                      <Table.HeadCell>Acciones</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {user.clientes.map((cliente, index) => (
                        <Table.Row
                          key={index}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index + 1}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {cliente.correo}
                          </Table.Cell>
                          <Table.Cell>{cliente.nombre}</Table.Cell>
                          <Table.Cell>{cliente.direccion}</Table.Cell>
                          <Table.Cell>
                            <button
                              type="button"
                              onClick={() => {
                                deleteCliente(index);
                                Swal.fire({
                                  title: "Cliente eliminado.",
                                  text: "El cliente ha sido eliminado correctamente.",
                                  icon: "success"
                                });
                              }}
                              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            >
                              Borrar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEdit(index)}
                              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Editar
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

export default Client;
