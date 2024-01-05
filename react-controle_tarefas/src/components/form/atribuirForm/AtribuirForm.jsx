
import { useForm } from "react-hook-form";
import { api } from "../../../../config/ConfigAxios";
import { useState, useEffect } from "react";
import SubmitButton from '../../itensFrom/button/SubmitButton';
import styles from "./AtribuirForm.module.css"
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


const AtribuirForm = ({ btnText, dadosForm }) => {
    const { register, setValue, handleSubmit } = useForm();
    const [aviso, setAviso] = useState("");
    const [usuario, setUsuario] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (dadosForm) {
            // Set the default values for the form fields when dadosForm is defined
            setValue('id_tarefa', dadosForm.titulo);
            setValue('tarefa', dadosForm.id);
        }
    }, [dadosForm, setValue]);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const [usuario] = await Promise.all([
                    api.get("/usuarios"),

                ]);
                setUsuario(usuario.data);
                //console.log(status.data)
            } catch (error) {
                console.error("Erro usuário:", error);
            }
        };
        fetchUsuario();
    }, []);



    //método chamado ao enviar form onSubmit
    const salvar = async (campos) => {
        
        const tarefaId = campos.tarefa;

       
        if (!window.confirm(`Confirma a atribuição de tarefa ?`)) {
            return;
        }
        try {
            const response = await api.post("/usuario_tarefas", {
                ...campos,
                id_usuario: campos.id_usuario, // Use the registered ID
                id_tarefa: tarefaId
            });
            setAviso(`Tarefa cadastrada com sucesso!"
              ${response.data.id}`);
            navigate('/tarefas')
        } catch (error) {
            setAviso("Erro ao cadastrar tarefa!", error);
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setAviso("");
        }, 5000);

        return () => clearTimeout(timer);
    }, [aviso]);





    //aqui é o que vai ser exibido em tela
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(salvar)}>
                <div className={styles.form_control}>
                    <label htmlFor="id_usuario">Responsável</label>
                    <select className="form-control" id="id_usuario" required {...register("id_usuario")}>
                        <option value='' >Selecione responsável</option>
                        {usuario.map((usuario => (
                            <option key={usuario.id} value={usuario.id} >{usuario.nome}</option>
                        )))}
                    </select>
                </div>

                <div className={styles.aling_button}>

                    <SubmitButton text={btnText} />
                </div>
            </form>
            <div className="alert"></div>
        </>
    )
}
AtribuirForm.propTypes = {
    btnText: PropTypes.string.isRequired,
    dadosForm: PropTypes.oneOfType([
        PropTypes.object,  // Assuming dadosForm is an object
        PropTypes.func,    // or PropTypes.func if it should be a function
    ]),
};

export default AtribuirForm;