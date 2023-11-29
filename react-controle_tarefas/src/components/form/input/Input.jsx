import PropTypes from 'prop-types';
import styles from './Input.module.css';

function Input({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )

}
Input.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func, // Assuming this is a function to handle onChange
    value: PropTypes.string, // Assuming the selected value is a string
};

export default Input
