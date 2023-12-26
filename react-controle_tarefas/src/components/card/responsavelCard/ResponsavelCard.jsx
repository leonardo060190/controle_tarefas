
import styles from './ResponsavelCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { api } from '../../../../config/ConfigAxios';


function ResponsavelCard({
  id,
  nome,
  sobrenome,
  email,
  handleRemove
}) {

  const removeresponsavel = async () => {
    if (!window.confirm(`Confirma a exclusão do Responsável ?`)) {
      return;
    }
  
    try {
      await api.delete(`/usuario_tarefas/${id}`);
      // Atualize a lista de responsáveis usando uma função de callback
      handleRemove(id);
    } catch (error) {
      alert(`Erro: Não foi possível excluir o responsável ${id}: ${error}`);
    }
  };

  return (
    <div className={styles.project_card}>
      <h4>{nome} {sobrenome}</h4>
      <p>
        <span>E-mail: </span> {email}
      </p>
      <div className={styles.project_card_actions}>
        <button onClick={removeresponsavel}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

ResponsavelCard.propTypes = {


  id: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  sobrenome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired
}



export default ResponsavelCard;
