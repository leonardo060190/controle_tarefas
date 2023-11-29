import TaskForm from '../../project/TaskForm'
import styles from './NewTask.module.css'

function NewTask () {

    return(
        <div className={styles.newtarefas_container}>
            <h1>Criar nova tarefa</h1>
            <p>Estabeleça suas tarefas de forma a manter um controle eficiente.</p>
            <TaskForm btnText="Criar Tarefa"/>
        </div>

    )
}

export default NewTask