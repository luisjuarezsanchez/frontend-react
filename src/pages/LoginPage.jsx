import React from "react";
import Login from "../components/Login/Login";
import NavBar from '../components/NavBar/NavBarLogin';

const LoginPage = ({ onLogin }) => {
  return (
    <div>
      <NavBar></NavBar>
      <Login onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
