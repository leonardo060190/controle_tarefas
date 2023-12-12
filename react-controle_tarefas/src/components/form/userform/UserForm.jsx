
import { useForm } from "react-hook-form";
import { api } from "../../../../config/ConfigAxios";
import { useState, useEffect } from "react";
import SubmitButton from '../../itensFrom/button/SubmitButton';
import styles from "./UserForm.module.css"
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


const TarefasForm = ({ btnText }) => {
    const { register, handleSubmit, reset } = useForm();
    const [aviso, setAviso] = useState("");
    const navigate = useNavigate(); 
   



    //método chamado ao enviar form onSubmit
    const salvar = async (campos) => {
        try {
            const response = await api.post("usuarios", campos);
            setAviso(`Usuario cadastrado com sucesso!)
              ${response.data.id}`);
            limparFormulario();
            navigate('/usuarios')

        } catch (error) {
            setAviso("Erro ao cadastrar usuario!");
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            
        }, 5000);

        return () => clearTimeout(timer);
    }, [aviso]);


    const limparFormulario = () => {
        reset({
            nome: "",
            sobrenome: "",
            email: "",
            senha: ""
        });
    };



    //aqui é o que vai ser exibido em tela
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(salvar)}>
                <div className={styles.form_control}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" className="form-control" id="nome" placeholder="Digite o nome"
                        required autoFocus {...register("nome")} />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input type="text" className="form-control" id="sobrenome" placeholder="Digite o sobrenome"
                        required {...register("sobrenome")} />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" className="form-control" id="email" placeholder="Informe o e-mail"
                        required {...register("email")} />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className="form-control" maxLength={8} id="senha" placeholder="Digite uma senha"
                        required {...register("senha")} />
                </div>

                <div className={styles.aling_button}>
                    
                    <SubmitButton text={btnText} />

                    <input type="reset" className={styles.btn_limpa}
                        value="Limpar Form" />
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