import TarefasForm from '../../form/tarefasForm/TarefasForm';
import styles from './NovaTarefa.module.css';

function NovaTarefa() {
    return (
        <section className={styles.novatarefas_container}>
            <h1>Criar nova tarefa</h1>
            <p>Estabeleça suas tarefas de forma a manter um controle eficiente.</p>
            <TarefasForm  btnText="Criar Projeto"/>
        </section>
    )
}

export default NovaTarefa