import React from "react";
import DataForm from "../components/DataForm/DataForm";
import NavBar from "../components/NavBar/NavBar";

const DataFormPage = ({ onSubmit }) => {
  const handleFormSubmit = (file) => {
    // Lógica de envío del formulario con el archivo seleccionado
    console.log("Archivo cargado:", file);
  };

  return (
    <div>
      <NavBar></NavBar>
      <DataForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default DataFormPage;
