// import { useEffect, useState } from 'react';
// import {api } from '../../config/ConfigAxios';


import PropTypes from 'prop-types';
import Input from '../form/input/Input';
import Select from '../form/select/Select';
import SubmitButton from '../form/submitbuttom/SubmitButton';

import styles from './TaskForm.module.css';

function TaskForm ({ btnText }) {


    return (
        <form className={styles.form}>
            <Input
                type="text"
                text="Nome da Tarefa"
                name="name"
                placeholder="Insira o nome da Tarefa"
            />

            <Input
                type="text"
                text="Descrição da Tarefa"
                name="description"
                placeholder="Insira a descrição da Tarefa"
            />
            <Select
                name="category_id"
                text="Selecione o Status"

            />

            <SubmitButton text={btnText} />
        </form>
    )
}

TaskForm.propTypes = {
    btnText: PropTypes.string.isRequired,
};

export default TaskForm