import styles from './LoginForm.module.css'
import LinkButton from '../../layout/linkButton/LinkButton';
import { useState } from "react";
import { useAuth } from '../../authProvider/AuthProvider'; // Ajuste o caminho conforme necessário
import { api } from "../../../../config/ConfigAxios";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useAuth();
    console.log(email, senha);

    const handleSubmit = async (e) => {

        e.preventDefault();



        if (email.trim() === "" || senha.trim() === "") {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await api.post("/login", { email, senha });
            if (response.status === 200) {
                login();
                navigate('/home');
                console.log(email, senha)

            } else {
                alert("Usuário ou senha inválidos!");
            }
        } catch (error) {
            alert("Erro ao tentar logar. Tente novamente mais tarde.");
        }
    };



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.right_login}>
                    <div className={styles.card_login}>
                        <h1>LOGIN</h1>
                        <div className={styles.text_field}>
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                required
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.text_field}>
                            <label htmlFor="password">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Senha"
                                required
                                value={senha}
                                onChange={(e) =>
                                    setSenha(e.target.value)}
                            />
                        </div>

                        <button className={styles.btn_login}>Login</button>

                        <LinkButton to="/cadastroUser" text="Cadastre-se" />

                    </div>
                </div>
            </form>
        </>
    )
}


export default LoginForm