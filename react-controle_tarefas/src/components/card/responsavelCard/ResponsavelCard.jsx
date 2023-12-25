
import styles from './ResponsavelCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

function ResponsavelCard({
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
        <button onClick={remove}>
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
