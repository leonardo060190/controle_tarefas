
import styles from './TarefasEditeForm.module.css'
import { useForm } from "react-hook-form";
import { api } from "../../../../config/ConfigAxios";
import { useState, useEffect } from "react";
import SubmitButton from '../../itensFrom/button/SubmitButton';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


const TarefasEditeForm = ({ btnText, dadosForm }) => {
  const { register, setValue, handleSubmit } = useForm();
  const [status, setStatus] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (dadosForm) {
      // Set the default values for the form fields when dadosForm is defined
      setValue('titulo', dadosForm.titulo);
      setValue('descricao', dadosForm.descricao);
      setValue('id_status', dadosForm.id_status);
      setValue('data_criacao', dadosForm.data_criacao);
      setValue('data_limite', dadosForm.data_limite);
    }
  }, [dadosForm, setValue]);

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

  const onSubmit = async (data) => {
    try {
      const response = await api.patch(`/tarefas/${dadosForm.id}`, data);
      console.log('Data updated successfully:', response.data);
      navigate(`/tarefas`);
      // You might want to do something after a successful update
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle the error appropriately
    }
  };



  //aqui é o que vai ser exibido em tela
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          <select

            className="form-control"
            id="status_id"
            required {...register("id_status")}>

            <option value=''>Selecione status</option>

            {status.map(((statusItem) => (
              <option
                key={statusItem.id}
                value={statusItem.id}
                selected={statusItem.id === dadosForm.id_status}
              >
                {statusItem.tipo}
              </option>
            )))}
          </select>
        </div>

        <div className={styles.inputdate}>
          <div className={styles.form_control}>
            <label htmlFor="data_criacao">Data de Criação</label>
            <input type="date" className="form-control"
              id="data_criacao" required {...register("data_criacao")}></input>
          </div>
          <div className={styles.form_control}>
            <label htmlFor="data_limite">Data Limite</label>
            <input type="date" className="form-control"
              id="data_limite" required {...register("data_limite")}></input>
          </div>
        </div>
        <div className={styles.aling_button}>

          <SubmitButton text={btnText} />

          <input type="reset" className={styles.btn_limpa}
            value="Limpar" />
        </div>
      </form>

    </>
  )
}
TarefasEditeForm.propTypes = {
  btnText: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  data_criacao: PropTypes.string.isRequired,
  data_limite: PropTypes.string.isRequired,
  dadosForm: PropTypes.oneOfType([
    PropTypes.object,  // Assuming dadosForm is an object
    PropTypes.func,    // or PropTypes.func if it should be a function
  ]),
};

export default TarefasEditeForm;