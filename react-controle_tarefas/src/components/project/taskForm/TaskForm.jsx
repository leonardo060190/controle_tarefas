import { useEffect, useState } from 'react';
//import { api } from '../../config/ConfigAxios';
//import { useForm } from 'react-hook-form';

import PropTypes from 'prop-types';
import Input from '../../form/input/Input';
//import Select from '../form/select/Select';
import SubmitButton from '../../form/submitbuttom/SubmitButton';

import styles from './TaskForm.module.css';

function TaskForm({ handleSubmit, btnText, taskData = {}}) {
    const [task, setTask] = useState(taskData || {})

    useEffect(() => {

        fetch("http://localhost:3000/tarefas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then((data) => { setTask(data) })
            .catch((err) => console.log(err))


    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(task)
    }

    function handleChange(e) {
        setTask({ ...task, [e.target.name]: e.target.value })
        console.log(task)
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input
                type="text"
                text="Nome da Tarefa"
                name="titulo"
                placeholder="Insira o nome da Tarefa"
                handleOnChange={handleChange}
                value={task.titulo ? task.titulo : ''}
                
            />

            <Input
                type="text"
                text="Descrição da Tarefa"
                name="descricao"
                placeholder="Insira a descrição da Tarefa"
                handleOnChange={handleChange}
                value={task.descricao ? task.descricao : ''}
            />

            <div className={styles.inputdate}>
                <Input
                    type="datetime-local"
                    text="Data de Criação"
                    name="data_criacao"
                    handleOnChange={handleChange}
                    value={task.data_criacao ? task.data_criacao : ''}
                />
                <Input
                    type="datetime-local"
                    text="Data para Finalizar"
                    name="data_limite"
                    handleOnChange={handleChange}
                    value={task.data_limite ? task.data_limite : ''}
                />
            </div>
            {/* <Select
                name="status_id"
                text="Selecione o Status"
                

            /> */}

            <SubmitButton text={btnText} />
        </form>
    )
}

TaskForm.propTypes = {
    btnText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    taskData: PropTypes.object.isRequired,
};

export default TaskForm