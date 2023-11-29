import PropTypes from 'prop-types';
import styles from './Select.module.css';

function Select({ text, name, /*options*/}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name}>
                {/* <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>

                ))} */}
            </select>
            
        </div>
    )

}

Select.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    // options: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         id: PropTypes.string.isRequired,
    //         name: PropTypes.string.isRequired,
    //     })
    // ).isRequired,
    handleOnChange: PropTypes.func, // Assuming this is a function to handle onChange
    value: PropTypes.string, // Assuming the selected value is a string
};

export default Select
