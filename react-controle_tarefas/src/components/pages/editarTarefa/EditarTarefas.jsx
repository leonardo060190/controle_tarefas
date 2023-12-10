
import styles from './EditarTarefas.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../layout/loading/Loading'
import Container from '../../layout/container/Container';
import TarefasForm from '../../form/tarefasForm/TarefasForm';
//import ServiceForm from '../service/ServiceForm';
//import Message from '../layout/Message';
//import ServiceCard from '../service/ServiceCard';
import {api} from '../../../../config/ConfigAxios'

function EditarTarefas() {

    const { titulo } = useParams([])
    console.log(titulo)

    const [tarefas, setTarefas] = useState([])
    console.log('teste',tarefas)
  
    useEffect(() => {
        setTimeout(() => {
            obterTarefa();
            
        }, 500)

    },[])

    const obterTarefa = async () => {
        try {
          const lista = await api.get(`/tarefas/${titulo}`);
          console.log(lista)
          setTarefas(lista.data);
          
        } catch (error) {
          alert(`Erro: ..Não foi possível obter os dados: ${error}`);
        }
      };

 

    return (
        <>
            {tarefas.titulo ? (
                <div className={styles.tarefas_details}>
                    <Container pageClass="column">
                        {/* {message && <Message type={type} msg={message} />} */}
                        <div className={styles.details_container}>
                            <h1>tarefa: {tarefas.titulo}</h1>
                            {/* <button className={styles.btn} onClick={toggletarefasForm}>
                                {!showtarefasForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showtarefasForm ? ( */}
                                <div className={styles.tarefas_info}>
                                    <p>
                                        <span>status:</span> {tarefas.status.tipo}
                                    </p>
                                    {/* <p>
                                        <span>Total de Orçamento:</span> R${tarefas.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${tarefas.cost}
                                    </p> */}
                                </div>

                            : (
                                <div className={styles.project_info}>
                                    <TarefasForm
                                       // handleSubmit={editPost}
                                        btnText="Concluir edição"
                                       // projectData={project}
                                    />
                                </div>
                            )
                        </div>
                        
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>

    )



}

export default EditarTarefas