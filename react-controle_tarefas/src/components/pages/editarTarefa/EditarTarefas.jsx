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
    const [showTarefaForm, setShowTarefaForm] = useState(false);
    const [dadosForm, setDadosForm] = useState({});
    console.log("teste", tarefas);
    console.log("testeF", tarefas);


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



    async function editPost(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const titulo = formData.get("titulo");
        const descricao = formData.get("descricao");
        const status_id = formData.get("tipo");
        const data_criacao = formData.get("data_criacao");
        const data_limite = formData.get("data_limite");

        try {
            const response = await api.patch(`/tarefas/${id}`, {
                titulo,
                descricao,
                status_id,
                data_criacao,
                data_limite,
            });
            console.log("teste3", response.data);
            setTarefas(response.data); // Atualize o estado com os dados atualizados
            setShowTarefaForm(!showTarefaForm);
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
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
                            <h1>Tarefa: {tarefas.titulo}</h1>
                            <button className={styles.btn} onClick={toggleTarefaForm}>
                                {!showTarefaForm ? 'Editar Tarefa' : 'Fechar'}
                            </button>
                            {!showTarefaForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>descricao: </span> {tarefas.descricao}
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
                                    <TarefasForm
                                        handleSubmit={editPost}
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
