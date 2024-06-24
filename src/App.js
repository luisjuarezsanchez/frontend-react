import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataFormPage from "./pages/DataFormPage";
import DataTablePage from "./pages/DataTablePage";
import DataTablePageInvitado from "./pages/DataTablePageInvitado";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/form" element={<DataFormPage />} />
        <Route path="/table" element={<DataTablePage />} />
        <Route path="/tableinvitado" element={<DataTablePageInvitado />} />
      </Routes>
    </Router>
  );
};

export default App;
