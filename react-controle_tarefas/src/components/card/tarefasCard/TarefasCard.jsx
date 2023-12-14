import { Link } from 'react-router-dom';
import styles from './TarefasCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

function TarefasCard({
  id,
  titulo,
  descricao,
  tipo,
  data_criacao,
  data_limite,
  handleRemove
}) {

  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  const dataCriacaoFormatada = new Date(data_criacao).toLocaleDateString();
  const dataLimiteFormatada = new Date(data_limite).toLocaleDateString();


  return (
    <div className={styles.project_card}>
      <h4>{titulo}</h4>
      <p>
        <span>Descrição:</span> {descricao}
      </p>
      <p>
        <span>data crição:</span> {dataCriacaoFormatada}
      </p>
      <p>
        <span>data limite:</span> {dataLimiteFormatada}
      </p>
      <p className={styles.category_text}>
        <span></span>{tipo}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/editartarefa/${id}`}>
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


  id: PropTypes.number.isRequired,
  titulo: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  data_criacao: PropTypes.string.isRequired,
  data_limite: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired
}



export default TarefasCard;
