
import styles from './Home.module.css';
import tarefas from '../../../assets/agendador-tarefas.jpg';
import LinkButton from '../../layout/linkButton/LinkButton';

function Home () {
    return (
        <section className={styles.home_container}>
            <h1> Bem-vindo ao <span>Controle de Tarefas</span></h1>
            <p>Comece a gerenciar suas tarefas agora mesmo!</p>
            <LinkButton to="/novatarefa" text="Criar Tarefa" />
            <img className={styles.imagen_home} src={tarefas} alt="Tarefas" />

        </section>
    )
}

export default Home