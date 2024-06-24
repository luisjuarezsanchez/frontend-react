import React, { useState, useRef } from "react";
import axios from "axios";

const DataForm = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (uploadedFile) => {
    const allowedExtensions = ["xlsx", "xls"];
    const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      setFile(uploadedFile);
      setAlertMessage("");
    } else {
      setFile(null);
      setAlertMessage("Solo se permiten archivos con extensión .xlsx o .xls");
    }

    // Optional: Reset input value to allow re-uploading of the same file
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setShowProgressBar(true); // Mostrar la barra de carga
      setAlertMessage(""); // Limpiar cualquier mensaje de alerta anterior

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://examentecnico.jairjuarezdeveloper.com/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully", response.data);

        // Mostrar el mensaje de éxito después de 2 segundos
        setTimeout(() => {
          setShowSuccessMessage(true);
          setShowProgressBar(false); // Ocultar la barra de carga
        }, 2000);
      } catch (error) {
        console.error("Error uploading file", error);
        setAlertMessage("Error al cargar el archivo. Por favor, inténtalo de nuevo.");
        setShowProgressBar(false); // Ocultar la barra de carga en caso de error
      }
    } else {
      setAlertMessage("Por favor selecciona un archivo válido.");
    }
  };

  const handleDelete = async () => {
    const userConfirmed = window.confirm("¿Estás seguro de que deseas vaciar las tablas?");
    if (!userConfirmed) {
      return;
    }

    try {
      const response = await axios.delete("https://examentecnico.jairjuarezdeveloper.com/api/personas/delete-all");
      setDeleteMessage("Tablas vaciadas correctamente.");
    } catch (error) {
      setDeleteMessage("Error al vaciar las tablas. Por favor, inténtalo de nuevo.");
      console.error("Error deleting tables", error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h1>Carga tu archivo xlsx</h1>
          <button className="btn btn-danger mt-3 mb-3" onClick={handleDelete}>
            Vaciar tablas
          </button>
          {deleteMessage && (
            <div className={`alert ${deleteMessage.includes("correctamente") ? "alert-success" : "alert-danger"}`} role="alert">
              {deleteMessage}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`form-control p-5 text-center ${
              dragActive ? "border border-primary" : ""
            }`}
            style={{
              border: dragActive ? "2px dashed #007bff" : "2px dashed #ccc",
            }}
          >
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Selecciona o arrastra tu archivo
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                ref={fileInputRef}
                onChange={handleChange}
                accept=".xlsx, .xls"
              />
            </div>
            {alertMessage && (
              <div className="alert alert-danger" role="alert">
                {alertMessage}
              </div>
            )}
            {showProgressBar && (
              <div className="progress mb-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: "100%" }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            )}
            {showSuccessMessage && (
              <div className="alert alert-success" role="alert">
                Archivo enviado y procesado correctamente
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              Cargar archivo
            </button>
            {file && <p>Archivo seleccionado: {file.name}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
