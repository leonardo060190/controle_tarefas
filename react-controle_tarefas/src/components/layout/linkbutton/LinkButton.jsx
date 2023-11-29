import PropTypes from 'prop-types';
import styles from './LinkButton.module.css';
import { Link } from 'react-router-dom';

function LinkButton({to, text}) {
    return (
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )

}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired, // Assuming 'to' is a required string
    text: PropTypes.string.isRequired, // Assuming 'text' is a required string
};

export default LinkButton