import styles from './EditarTarefas.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../layout/loading/Loading';
import Container from '../../layout/container/Container';
import TarefasForm from '../../form/tarefasForm/TarefasForm';
import { api } from '../../../../config/ConfigAxios';

function EditarTarefas() {
    const { id } = useParams();
    const [tarefas, setTarefas] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    console.log("teste", tarefas);
    useEffect(() => {
        async function obterTarefa() {
            try {
                const response = await api.get(`/tarefas/${id}`);
                console.log("teste3", response.data);
                setTarefas(response.data);
            } catch (error) {
                alert(`Erro: Não foi possível obter os dados: ${error}`);
            }
        }

        // Call the function to fetch data
        obterTarefa();
    }, [id]);

    async function editPost(updatedData) {
        try {
            const response = await api.patch(`/tarefas/${id}`, updatedData);
            console.log("teste3", response.data);
            setTarefas(response.data);
            setShowProjectForm(!showProjectForm);
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
        }
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    return (
        <>
            {tarefas.id ? (
                <div className={styles.project_details}>
                    <Container pageClass="column">
                        <div className={styles.details_container}>
                            <h1>Projeto: {tarefas.titulo}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>descricao:</span> {tarefas.descricao}
                                    </p>
                                    {/* Add other project information */}
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <TarefasForm
                                        handleSubmit={(updatedData) => editPost(updatedData)}
                                        btnText="Concluir edição"
                                        responsedata={tarefas}
                                    />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default EditarTarefas;
