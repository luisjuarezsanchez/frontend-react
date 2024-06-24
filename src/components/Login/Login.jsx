import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí deberías hacer la llamada POST al endpoint de login
    const response = await fetch(
      "https://examentecnico.jairjuarezdeveloper.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.user.is_admin === 1) {
        // Si el usuario es administrador, redirige a /form
        navigate("/form");
      } else {
        // Si no es administrador, redirige a /table
        navigate("/tableinvitado");
      }
    } else {
      // Manejo de errores, por ejemplo mostrar un mensaje al usuario
      console.error("Error en el login");
    }
  };

  return (
    <div className="container container-login mt-5">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <h1 className="mb-5 mt-3 title-login">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-login">Email:</label>
              <input
                className="form-control message-login"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label className="form-label text-login">Password:</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="***********"
              />
            </div>
            <button className="btn btn-primary mt-4" type="submit">
              Inicia sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
