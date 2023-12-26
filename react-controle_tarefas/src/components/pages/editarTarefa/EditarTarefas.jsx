import styles from './EditarTarefas.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../layout/loading/Loading';
import Container from '../../layout/container/Container';
import TarefasEditeForm from '../../editeForm/tarefasEditeForm/TarefasEditeForm';
import AtribuirForm from '../../form/atribuirForm/AtribuirForm';
import { api } from '../../../../config/ConfigAxios';
import ResponsavelCard from '../../card/responsavelCard/ResponsavelCard'


function EditarTarefas() {
    const { id } = useParams();

    const [tarefas, setTarefas] = useState({});
    const [responsaveis, setResponsaveis] = useState({});
    const [showTarefaForm, setShowTarefaForm] = useState(false);
    const [showAtribuirForm, setShowAtribuirForm] = useState(false);
    const [dadosForm, setDadosForm] = useState({});

    useEffect(() => {
        async function obterTarefa() {
            try {
                const response = await api.get(`/tarefas/${id}`);
                setTarefas(response.data);
                setDadosForm(response.data);
            } catch (error) {
                alert(`Erro: Não foi possível obter os dados: ${error}`);
            }
        }

        obterTarefa();
        obterAtribuicao()
        
    }, [id]);

    async function obterAtribuicao() {
        try {
          const response = await api.get(`/usuario_tarefas/${id}`);
          const responsaveis = response.data;
          if (responsaveis.length > 0) {
            setResponsaveis(responsaveis);
          } else {
            setResponsaveis([]);
          }
        } catch (error) {
         `Erro: Não foi possível obter os dados`;
        }
      }



    async function editPost(formData) {
        try {
            const response = await api.patch(`/tarefas/${id}`, formData);
            console.log('Data updated successfully:', response.data);
            setTarefas(response.data);

            setShowTarefaForm(!showTarefaForm);
        } catch (error) {
            console.error('Error updating data:', error);
            // Handle the error appropriately
        }
    }

    const handleRemoveResponsavel = (id) => {
        setResponsaveis((responsaveis) => responsaveis.filter((responsavel) => responsavel.id !== id));
      };

    
    function toggleTarefaForm() {
        setShowTarefaForm(!showTarefaForm);
    }

    function toggleAtribuirForm() {
        setShowAtribuirForm(!showAtribuirForm)
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
                        <div className={styles.service_from_container}>
                            <h2>Atribuição de responsavel</h2>
                            <button className={styles.btn} onClick={toggleAtribuirForm}>
                                {!showAtribuirForm ? 'Atribuir responsavel' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showAtribuirForm && <AtribuirForm
                                    btnText='Atribuir responsável'
                                    dadosForm={dadosForm}
                                />}
                            </div>
                            <h2>Responsáveis:</h2>
                            <Container pageClass="start">
                                {responsaveis.length > 0 &&
                                    responsaveis.map((responsavel) => (
                                        <ResponsavelCard
                                            id={responsavel.id}
                                            nome={responsavel.nome}
                                            sobrenome={responsavel.sobrenome}
                                            email={responsavel.email}
                                            Key={responsavel.id}
                                            handleRemove={handleRemoveResponsavel}
                                        />
                                    ))}
                                {responsaveis && responsaveis.length === 0 && <p>Não há serviços cadastrados</p>}

                            </Container>


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
