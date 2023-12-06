
import { useForm } from "react-hook-form";
import { api } from "../../../../config/ConfigAxios";
import { useState, useEffect } from "react";
import SubmitButton from '../../itensFrom/button/SubmitButton';
import styles from "./UserForm.module.css"
import PropTypes from 'prop-types';


const TarefasForm = ({ btnText }) => {
    const { register, handleSubmit, reset } = useForm();
    const [aviso, setAviso] = useState("");
    //const [usuario, setUsuario] = useState([]);



    // useEffect(() => {
    //     const fetchUsuario = async () => {
    //         try {
    //             const [usuario] = await Promise.all([
    //                 api.get("/usuarios"),

    //             ]);
    //             setUsuario(usuario.data);
    //             console.log(usuario.data)
    //         } catch (error) {
    //             console.error("Erro usuario:", error);
    //         }
    //     };
    //     fetchUsuario();
    // }, []);

    //método chamado ao enviar form onSubmit
    const salvar = async (campos) => {
        try {
            const response = await api.post("usuarios", campos);
            setAviso(`Usuario cadastrado com sucesso!)
              ${response.data.id}`);
            limparFormulario();

        } catch (error) {
            setAviso("Erro ao cadastrar usuario!");
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAviso("");
        }, 5000);

        return () => clearTimeout(timer);
    }, [aviso]);


    const limparFormulario = () => {
        reset({
            nome: "",
        });
    };



    //aqui é o que vai ser exibido em tela
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(salvar)}>
                <div className={styles.form_control}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" className="form-control" id="titulo"
                        required autoFocus {...register("nome")} />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input type="text" className="form-control" id="sobrenome"
                        required {...register("sobrenome")} />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" className="form-control" id="email"
                        required {...register("email")} />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className="form-control" id="senha"
                        required {...register("senha")} />
                </div>

                <div className={styles.aling_button}>
                    <SubmitButton text={btnText} />
                    <input type="reset" className={styles.btn_limpa}
                        value="Limpar" />
                </div>
            </form>
            <div className="alert"></div>
        </>
    )
}
TarefasForm.propTypes = {
    btnText: PropTypes.string.isRequired,

};

export default TarefasForm;