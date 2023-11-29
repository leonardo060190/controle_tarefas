import PropTypes from 'prop-types';
import styles from './Container.module.css'

function Container(props) {

    return (
        <div className={`${styles.container} ${styles[props.pageClass]}`}>
            {props.children}
        </div>

    )

}

Container.propTypes = {
    pageClass: PropTypes.string, // Assuming pageClass is optional
    children: PropTypes.node.isRequired,
};

export default Container