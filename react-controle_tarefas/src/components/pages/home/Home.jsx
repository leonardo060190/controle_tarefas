
import styles from './Home.module.css';
import savings from '../../../assets/savings.svg';
import LinkButton from '../../layout/linkbutton/LinkButton';

function Home () {
    return (
        <section className={styles.home_container}>
            <h1> Bem-vindo ao <span>Controle de Tarefas</span></h1>
            <p>Comece a gerenciar suas tarefas agora mensmo!</p>
            <LinkButton to="/newtask" text="Criar Tarefa" />
            <img src={savings} alt="Tarefas" />

        </section>
    )
}

export default Home