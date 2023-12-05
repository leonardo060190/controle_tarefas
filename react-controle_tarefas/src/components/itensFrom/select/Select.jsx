import PropTypes from 'prop-types';
import styles from './Select.module.css';

function Select({ text, name, /*options*/ handleOnChange, value  }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select 
            name={name} 
            id={name}
            onChange={handleOnChange}
            value={value || ''}
            >
                {/* <option>Selecione uma opção</option>
                {options.map((options) => (
                    <option
                        value={options.id}
                        key={options.id}>
                        {options.name}
                    </option>

                )
                )} */}
            </select>

        </div>
    )

}

Select.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleOnChange: PropTypes.func, // Assuming this is a function to handle onChange
    value: PropTypes.number, // Assuming the selected value is a string
};

export default Select
