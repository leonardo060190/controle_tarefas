import styles from './EditarTarefas.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../layout/loading/Loading';
import Container from '../../layout/container/Container';
import TarefasEditeForm from '../../editeForm/tarefasEditeForm/TarefasEditeForm';
import { api } from '../../../../config/ConfigAxios';


function EditarTarefas() {
    const { id } = useParams();

    const [tarefas, setTarefas] = useState({});
    const [showTarefaForm, setShowTarefaForm] = useState(false);
    const [dadosForm, setDadosForm] = useState({});
    console.log("teste", tarefas);
    console.log("testeF", dadosForm);


    useEffect(() => {
        async function obterTarefa() {
            try {
                const response = await api.get(`/tarefas/${id}`);
                console.log("teste3", response.data);
                setTarefas(response.data);
                setDadosForm(response.data);
            } catch (error) {
                alert(`Erro: Não foi possível obter os dados: ${error}`);
            }
        }

        obterTarefa();
    }, [id]);



    async function editPost(formData) {
        try {
          const response = await api.put(`/tarefas/${id}`, formData);
          console.log('Data updated successfully:', response.data);
          setTarefas(response.data);
          
          setShowTarefaForm(!showTarefaForm);
        } catch (error) {
          console.error('Error updating data:', error);
          // Handle the error appropriately
        }
      }

    function toggleTarefaForm() {
        setShowTarefaForm(!showTarefaForm);
    }

    return (
        <>
            {tarefas.id ? (
                <div className={styles.project_details}>
                    <Container pageClass="column">
                        <div className={styles.details_container}>
                            <h1>{tarefas.titulo}</h1>
                            <button className={styles.btn} onClick={toggleTarefaForm}>
                                {!showTarefaForm ? 'Editar Tarefa' : 'Fechar'}
                            </button>
                            {!showTarefaForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Descricao: </span> {tarefas.descricao}
                                    </p>

                                    <p>
                                        <span>Data de Criação: </span> {tarefas.data_criacao}
                                    </p>

                                    <p>
                                        <span>Data Limite: </span> {tarefas.data_limite}
                                    </p>

                                    <p>
                                        <span>Status: </span> {tarefas.tipo}
                                    </p>


                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <TarefasEditeForm
                                        handleSubmit={(data) => editPost(data)}
                                        btnText="Concluir edição"
                                        dadosForm={dadosForm}
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
