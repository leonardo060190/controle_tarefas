//Componente para incluir livros no banco de dados
//declaração da função do componente IncluirLivros
import { useForm } from "react-hook-form";
import { api } from "../../../../config/ConfigAxios";
import { useState, useEffect } from "react";
import SubmitButton from '../../itensFrom/button/SubmitButton';
import styles from "./TarefasForm.module.css"
import PropTypes from 'prop-types';

//register serve para definir os nomes dos campos do form (validações)
//handleSubmit, para indicar o método a ser acionado no evento onSubmit do form
//form onSubmit={handleSubmit(salvar)}
const TarefasForm = ({ btnText }) => {
    const { register, handleSubmit } = useForm();
    const [setAviso] = useState("");
    const [status, setStatus] = useState([]);



    useEffect(() => {
        const fetchStatus = async () => {
          try {
            const [status] = await Promise.all([
              api.get("/status"),
             
            ]);
            setStatus(status.data);
            console.log(status.data)
          } catch (error) {
            console.error("Erro status:", error);
          }
        };
        fetchStatus();
      }, []);

    //método chamado ao enviar form onSubmit
    const salvar = async (campos) => {
        try {
          const response = await api.post("tarefas", {
            ...campos,
            status_id: campos.id_status, // Use the registered ID
          });
          setAviso(`Tarefa cadastrada com sucesso!"
              ${response.data.id}`);
        } catch (error) {
          setAviso("Erro ao cadastrar tarefa!");
        }
      };

    //aqui é o que vai ser exibido em tela
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" className="form-control" id="titulo"
                        required autoFocus {...register("titulo")} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" className="form-control" id="descricao"
                        required {...register("descricao")} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="status">Status:</label>
                    <select className="form-control" id="status_id" required {...register("id_status")}>
                        <option value="">Selecione um autor</option>
                        {status.map((status => (
                            <option key={status.id} value={status.id}>{status.tipo}</option>
                        )))}
                    </select>
                </div>

                <div className={styles.inputdate}>
                    <label htmlFor="data_criacao">Data de Criação</label>
                    <input type="date" className="form-control"
                        id="data_criacao" required {...register("data_criacao")}></input>



                    <label htmlFor="data_limite">Data Limite</label>
                    <input type="date" className="form-control"
                        id="data_limite" required {...register("data_limite")}></input>
                </div>
                <SubmitButton text={btnText} />
                <input type="reset" className={styles.btn_limpa}
                    value="Limpar" />
            </form>
            <div className="alert"></div>
        </>
    )
}
TarefasForm.propTypes = {
    btnText: PropTypes.string.isRequired,

};

export default TarefasForm;