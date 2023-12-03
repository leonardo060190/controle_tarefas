import TaskForm from '../../project/taskForm/TaskForm'
import styles from './NewTask.module.css'
import { useNavigate } from 'react-router-dom'

function NewTask () {

    const navigate = useNavigate();

    function createTarefa(tarefa) {
        //initialize costs and services
      

        fetch('http://localhost:3000/tarefas', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefa),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                //redirect
                navigate('/tarefas', { message: 'Tarefa criada com sucesso' })
            })
            .catch((err) => console.log(err))
    }

    return(
        <div className={styles.newtarefas_container}>
            <h1>Criar nova tarefa</h1>
            <p>Estabeleça suas tarefas de forma a manter um controle eficiente.</p>
            <TaskForm handleSubmit={createTarefa} btnText="Criar Tarefa"/>
        </div>

    )
}

export default NewTask