import { useState } from 'react';
import { api } from '../../config/ConfigAxios';
import { useForm } from 'react-hook-form';

import PropTypes from 'prop-types';
import Input from '../form/input/Input';
import Select from '../form/select/Select';
import SubmitButton from '../form/submitbuttom/SubmitButton';

import styles from './TaskForm.module.css';

function TaskForm({ btnText }) {

    const { register, handleSubmit, reset } = useForm();
    const [setAviso] = useState("");

    const salvar = async (campos) => {
        try {
            const response = await api.post('/tarefas', campos); {
                console.log(response);
                setAviso(`Livro cadastrado com sucesso!`);
                // titulo: data.titulo,
                // descricao: data.descricao,
                // data_criacao: data.data_criacao,
                // data_limite: data.data_limite,
                // status_id: data.status_id
            }

            if (response.ok) {
                // Handle success, e.g., redirect or show a success message
                console.log('Task created successfully');
                setAviso('Tarefa cadastrada com sucesso!');
            } else {
                // Handle errors, e.g., show an error message
                console.error('Failed to create task');
                setAviso('Erro... Tarefa não cadastrada!');
            }
        } catch (error) {
            console.error('Error creating task:', error);
            setAviso(`Erro... Tarefa não cadastrada! ${error}`);
        }

        // Clear the form fields for a new task
        reset({ titulo: '', descricao: '', data_criacao: '', data_limite: '', status_id: '' });

        // Hide the message after 5 seconds
        setTimeout(() => {
            setAviso("");
        }, 5000);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(salvar)}>
            <Input
                type="text"
                text="Nome da Tarefa"
                name="titulo"
                placeholder="Insira o nome da Tarefa"
                {...register('titulo')}
            />

            <Input
                type="text"
                text="Descrição da Tarefa"
                name="descricao"
                placeholder="Insira a descrição da Tarefa"
                {...register('descricao')}
            />

            <div className={styles.inputdate}>
                <Input
                    type="datetime-local"
                    text="Data de Criação"
                    name="data_criacao"
                    {...register('data_criacao')}
                />
                <Input
                    type="datetime-local"
                    text="Data para Finalizar"
                    name="data_limite"
                    {...register('data_limite')}
                />
            </div>
            <Select
                name="status_id"
                text="Selecione o Status"
                {...register('status_id')}

            />

            <SubmitButton text={btnText} />
        </form>
    )
}

TaskForm.propTypes = {
    btnText: PropTypes.string.isRequired,
};

export default TaskForm