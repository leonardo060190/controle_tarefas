import { Link } from 'react-router-dom';
import styles from './TarefasCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

function TarefasCard({ tarefas = {} , handleRemove }) {
  if (!tarefas) return <p>Carregando...</p>;
  const { id, titulo, descricao, status } = tarefas;
  console.log(tarefas)

  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };


  return (
    <div className={styles.project_card}>
      <h4>{titulo}</h4>
      <p>
        <span>Descrição:</span> {descricao}
      </p>
      <p className={styles.category_text}>
        <span >{status}</span>
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/editarTarefas/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

TarefasCard.propTypes = {
  tarefas: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      descricao: PropTypes.string.isRequired,
      status: PropTypes.string,
    }),
    // Add a shape for the loading state:
    PropTypes.shape({
      length: PropTypes.number.isRequired,
    }),
  ]).isRequired,
  handleRemove: PropTypes.func.isRequired,
};
export default TarefasCard;
