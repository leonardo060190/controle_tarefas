import React, { useState } from "react";
//import { api } from ".../config_axios";
import "./login.css";
import login from "../image/login.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importe o useHistory


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCadastroButton, setShowCadastroButton] = useState(false);
  const navigate = useNavigate(); // Obtenha o objeto de histórico

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode adicionar a lógica de autenticação, por exemplo, enviar os dados para um servidor
    // e verificar se as credenciais são válidas.

    console.log("Email:", email);
    console.log("Senha:", password);

    // Limpar os campos de entrada após a submissão (você pode adicionar lógica adicional aqui)
    setEmail("");
    setPassword("");
  };

  const handleCadastroButtonClick = (e) => {
    // Aqui você pode adicionar a lógica para navegar para a tela de cadastro
    navigate.push("/cadastro");

    // Oculta o botão de cadastro após a navegação
    setShowCadastroButton(false);
  };

  //useEffect(() => {
    // Verificar se o usuário já está cadastrado
    //api.get("/users").then((response) => {
      // Se o usuário estiver cadastrado, desabilitar o botão de cadastro
  //     if (response.data) {
  //       setShowCadastroButton(false);
  //     }
  //   }).catch((error) => {
  //     // Se o usuário não estiver cadastrado, habilitar o botão de cadastro
  //     setShowCadastroButton(true);
  //   });
  // }, [email]);

  return (
    <div className="login-container">
      <div className="left-login">
        <h1>Faça Login</h1>
        <img src={login} alt="Login" title="Imagem de login" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="right-login">
          <div className="card-login">
            <h1>LOGIN</h1>
            <div className="text-field">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="E-mail"
                required
              />
            </div>
            <div className="text-field">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Senha"
                required
              />
            </div>
            <button type="submit" className="btn-login">Entrar</button>
            {showCadastroButton && (
              <button
                type="button"
                className="btn-cadastro"
                onClick={handleCadastroButtonClick}
              >
                Cadastrar-se
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
