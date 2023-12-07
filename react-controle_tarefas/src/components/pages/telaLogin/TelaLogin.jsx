

import styles from "./TelaLogin.module.css";
import login from "../../../assets/login.svg";
import LoginForm from "../../form/loginForm/LoginForm";

function Login() {


  return (
    <section className={styles.login_container}>
      <div className={styles.left_login}>
        <h1>Faça Login</h1>
        <img src={login} alt="Login" title="Imagem de login" />
      </div>
      <LoginForm />
    </section>
  )

}

export default Login;
