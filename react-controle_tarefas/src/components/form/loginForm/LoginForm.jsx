import styles from './LoginForm.module.css'
import LinkButton from '../../layout/linkButton/LinkButton'

function LoginForm() {

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [showCadastroButton, setShowCadastroButton] = useState(false);
    // const navigate = useNavigate(); // Obtenha o objeto de histórico

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };

    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Aqui você pode adicionar a lógica de autenticação, por exemplo, enviar os dados para um servidor
    //     // e verificar se as credenciais são válidas.

    //     console.log("Email:", email);
    //     console.log("Senha:", password);

    //     // Limpar os campos de entrada após a submissão (você pode adicionar lógica adicional aqui)
    //     setEmail("");
    //     setPassword("");
    // };

    // const handleCadastroButtonClick = (e) => {
    //     // Aqui você pode adicionar a lógica para navegar para a tela de cadastro
    //     navigate.push("/cadastro");

    //     // Oculta o botão de cadastro após a navegação
    //     setShowCadastroButton(false);
    //};
    return (
        <>
            <form >
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
                            />
                        </div>
                        
                        <button className={styles.btn_login}>Login</button>
                        
                        <LinkButton to="/cadastroUser" text="Cadastre-se"/>

                    </div>
                </div>
            </form>
        </>
    )
}


export default LoginForm