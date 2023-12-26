import { Link } from 'react-router-dom';
import styles from './UsuariosCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

function UsuariosCard({
  id,
  nome,
  sobrenome,
  email,
  handleRemove
}) {

  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className={styles.project_card}>
      <h4>{nome} {sobrenome}</h4>
      <p>
        <span>E-mail: </span> {email}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/editarusuario/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

UsuariosCard.propTypes = {


  id: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  sobrenome: PropTypes.string.isRequired,
  //senha: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired
}



export default UsuariosCard;
