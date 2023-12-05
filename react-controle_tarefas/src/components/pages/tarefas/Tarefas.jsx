import styles from './Tarefas.module.css'
import { useState, useEffect } from 'react';
import LinkButton from '../../layout/linkButton/LinkButton'
import Container from '../../layout/container/Container'
import TarefasCard from '../../form/tarefasCard/TarefasCard'
import Loading from '../../layout/loading/Loading'


function Tarefas() {

    const [tarefas, setTarefas] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
          fetch('http://localhost:3000/tarefas', {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              setTarefas(data);
              setRemoveLoading(true)
            })
            .catch((err) => console.log(err));
    
        }, 100)
      }, []);

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Tarefas</h1>
                <LinkButton to="/novaTarefa" text="Criar Tarefa" />
            </div>
            <Container pageClass="start">
                {tarefas.length > 0 && tarefas.map((tarefa) => (
                    <TarefasCard
                        key={tarefa.id}
                        id={tarefa.id}
                        titulo={tarefa.titulo}
                        descricao={tarefa.descricao}
                        status={tarefa.status ? tarefa.status.tipo : 'Sem Categoria'}
                    //handleRemove={removeProjet}
                    />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && tarefas.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}



            </Container>
        </div>
    )
}

export default Tarefas