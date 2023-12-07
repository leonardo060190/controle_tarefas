
import { useForm } from "react-hook-form";
import { api } from "../../../../config/ConfigAxios";
import { useState, useEffect } from "react";
import SubmitButton from '../../itensFrom/button/SubmitButton';
import styles from "./TarefasForm.module.css"
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


const TarefasForm = ({ btnText }) => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");
  const [status, setStatus] = useState([]);
  const navigate = useNavigate(); 



  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const [status] = await Promise.all([
          api.get("/status"),

        ]);
        setStatus(status.data);
        //console.log(status.data)
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
      limparFormulario();
      navigate('/tarefas')
    } catch (error) {
      setAviso("Erro ao cadastrar tarefa!");
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
      titulo: "",
      descricao: "",
      status: "",
      data_criacao: "",
      data_limite: ""
    });
  };



  //aqui é o que vai ser exibido em tela
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(salvar)}>
        <div className={styles.form_control}>
          <label htmlFor="titulo">Titulo</label>
          <input type="text" className="form-control" id="titulo" placeholder="Adicione um titulo"
            required autoFocus {...register("titulo")} />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="descricao">Descrição</label>
          <input type="textarea" className="form-control" id="descricao" placeholder="Descreva a tarefa" 
            required {...register("descricao")} />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="status_id">Status</label>
          <select className="form-control" id="status_id" required {...register("id_status")}>
            <option value="">Selecione um Status</option>
            {status.map((status => (
              <option key={status.id} value={status.id}>{status.tipo}</option>
            )))}
          </select>
        </div>

        <div className={styles.inputdate}>
          <div className={styles.form_control}>
            <label htmlFor="data_criacao">Data de Criação</label>
            <input type="date" className="form-control"
              id="data_criacao" required {...register("data_criacao")}></input><span className="validity"></span>
          </div>
          <div className={styles.form_control}>
            <label htmlFor="data_limite">Data Limite</label>
            <input type="date" className="form-control"
              id="data_limite" required {...register("data_limite")}></input><span className="validity"></span>
          </div>
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