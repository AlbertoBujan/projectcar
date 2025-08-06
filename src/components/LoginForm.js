import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../App";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/"); // Redirige si ya hay token
    }
  }, [token, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    const nuevoUsuarioServidor = {
      email: email,
      password: password,
    };

    const res = await fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nuevoUsuarioServidor),
    });

    const resMessage = await res.json();

    if (res.status === 200) {
      setToken(resMessage.accessToken);
      // La redirección se hace automáticamente en useEffect
    } else {
      setErrorMsg(resMessage.error || "Error al iniciar sesión");
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login">
        <Link to="/">
          <img src="./assets/logo_pequeño.png" alt="logo" />
        </Link>

        <p>Mi Cuenta</p>

        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </label>
          <label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
            />
          </label>

          <div className="not-registered">
            <Link to="/register">
              <p>¿Aún no estás registrado?</p>
            </Link>
          </div>

          <div className="form-button">
            <button type="submit">Enviar</button>
          </div>
          {errorMsg && <div className="error">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
