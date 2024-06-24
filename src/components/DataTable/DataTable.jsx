import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Tamaño de página, valor por defecto
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize]); // Se ejecuta cada vez que pageNumber o pageSize cambian

  const fetchData = () => {
    fetch(
      `https://examentecnico.jairjuarezdeveloper.com/api/personas?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePrevClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextClick = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePageSizeChange = (event) => {
    const size = parseInt(event.target.value);
    setPageSize(size);
    setPageNumber(1); // Resetear a la primera página al cambiar el tamaño de página
  };

  const handleShowDetail = (person) => {
    setSelectedPerson(person);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPerson(null);
  };

  const renderDetails = (person) => {
    if (!person) return null;

    // Separar las direcciones por comas
    const calles = person.calle.split(",");
    const numerosExteriores = person.numero_exterior.split(",");
    const numerosInteriores = person.numero_interior.split(",");
    const colonias = person.colonia.split(",");
    const cps = person.cp.split(",");

    return (
      <div>
        <h5>Direcciones:</h5>
        {calles.map((calle, index) => (
          <div key={index}>
            <h6>Dirección {index + 1}:</h6>
            <Table striped bordered>
              <tbody>
                <tr>
                  <td>Calle:</td>
                  <td>{calle}</td>
                </tr>
                <tr>
                  <td>Número Exterior:</td>
                  <td>{numerosExteriores[index]}</td>
                </tr>
                <tr>
                  <td>Número Interior:</td>
                  <td>{numerosInteriores[index]}</td>
                </tr>
                <tr>
                  <td>Colonia:</td>
                  <td>{colonias[index]}</td>
                </tr>
                <tr>
                  <td>CP:</td>
                  <td>{cps[index]}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))}

        <h5>Teléfonos:</h5>
        <Table striped bordered>
          <tbody>
            {person.telefono.split(",").map((telefono, index) => (
              <tr key={index}>
                <td>{`Teléfono ${index + 1}:`}</td>
                <td>{telefono}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <div className="container mt-3">
      <h1>Consulta de datos</h1>
      <div className="mb-3">
        <label htmlFor="pageSizeInput" className="form-label">
          Número de registros por página:
        </label>
        <select
          id="pageSizeInput"
          className="form-select"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Ver detalle</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.paterno}</td>
              <td>{item.materno}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowDetail(item)}
                >
                  Ver detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        variant="primary"
        onClick={handlePrevClick}
        disabled={pageNumber === 1}
      >
        Anterior
      </Button>
      <Button variant="primary" onClick={handleNextClick} className="ml-2">
        Siguiente
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderDetails(selectedPerson)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
};

export default DataTable;
