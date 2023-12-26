import styles from './Tarefas.module.css'
import { useState, useEffect } from 'react';
import LinkButton from '../../layout/linkButton/LinkButton'
import Container from '../../layout/container/Container'
import TarefasCard from '../../card/tarefasCard/TarefasCard'
import Loading from '../../layout/loading/Loading'
import { api } from '../../../../config/ConfigAxios'
import { useForm } from 'react-hook-form'
import Pagination from '../../layout/paginacao/Pagination'
import SubmitButton from '../../itensFrom/button/SubmitButton'



function Tarefas() {

  const [tarefas, setTarefas] = useState([]);
  const [pesquisaResultados, setPesquisaResultados] = useState([]);
  const [pesquisaAtiva, setpesquisaAtiva] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    setTimeout(() => {
      if (pesquisaAtiva) {
        // Se a pesquisa está ativa, exibir resultados da pesquisa
        setTarefas(pesquisaResultados);
      } else {
        // Se não, obter a lista completa
        obterLista();
      }
    }, 100);
  }, [currentPage, pesquisaAtiva, pesquisaResultados]);

  const voltarALista = () => {
    setpesquisaAtiva(false);
    obterLista();
  }

  const obterLista = async () => {
    try {
      const limitePorPagina = 12;
      const offset = (currentPage - 1) * limitePorPagina;

      const lista = await api.get(`/tarefas?_limit=${limitePorPagina}&_start=${offset}`);
      setTarefas(lista.data);
      setRemoveLoading(true);
    } catch (error) {
      alert(`Erro: Não foi possível obter os dados: ${error}`);
    }
  };

  const filtrarLista = async (campos) => {
    try {
      const response = await api.get(`/tarefas/lista/${campos.titulo}`);
      
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }

      // Adicione este console.log para verificar os dados recebidos
      console.log("Dados recebidos:", response.data.data);

      setPesquisaResultados(response.data.data);
      setpesquisaAtiva(true);
      limparFormulario();
      
    } catch (error) {
      alert(`Erro: Não foi possível obter os dados: ${error}`);
    }
  };



  const removeTarefa = async (id, titulo) => {
    if (!window.confirm(`Confirma a exclusão do Tarefa ?`)) {
      return;
    }
    try {
      await api.delete(`/tarefas/${id}`);
      //formar uma nova lista de tarefas sem a tarefa que foi excluida
      setTarefas(tarefas.filter(tarefa => tarefa.id !== id));

    } catch (error) {
      alert(`Erro: ..Não foi possível excluir a tarefa ${titulo}: ${error}`);
    }
  }

  const limparFormulario = () => {
    reset({
        titulo: ""
    });
};

  const startIndex = (currentPage - 1) * 12;
  const endIndex = startIndex + 12;
  const tarefasToDisplay = (pesquisaAtiva ? pesquisaResultados : tarefas).slice(startIndex, endIndex);



  return (

    <div className={styles.project_container}>

      <form className={styles.form} onSubmit={handleSubmit((data) => filtrarLista(data))}>
        <input type="text" className={styles.form_control} placeholder="Titulo" required {...register("titulo")} />
        <SubmitButton text='Pesquisa' />

        {pesquisaAtiva && (
          <button className={styles.button_voltar} onClick={voltarALista}>Voltar à Lista</button>
        )}
      </form>

      <div className={styles.title_container}>
        <h1>Tarefas</h1>

        <LinkButton to="/novaTarefa" text="Criar Tarefa" />
      </div>

      <Container pageClass="start">
        {pesquisaAtiva ? (
          pesquisaResultados.length > 0 ? (
            pesquisaResultados.map((tarefa) => (
              <TarefasCard
                key={tarefa.id}
                id={tarefa.id}
                titulo={tarefa.titulo}
                descricao={tarefa.descricao}
                tipo={tarefa.tipo}
                data_criacao={tarefa.data_criacao}
                data_limite={tarefa.data_limite}
                handleRemove={removeTarefa}
                handleSubmit={filtrarLista}
              />
            ))
          ) : (
            <p>Nenhum resultado encontrado.</p>
          )
        ) : (
          tarefasToDisplay.length > 0 ? (
            tarefasToDisplay.map((tarefa) => (
              <TarefasCard
                key={tarefa.id}
                id={tarefa.id}
                titulo={tarefa.titulo}
                descricao={tarefa.descricao}
                tipo={tarefa.tipo}
                data_criacao={tarefa.data_criacao}
                data_limite={tarefa.data_limite}
                handleRemove={removeTarefa}
                handleSubmit={filtrarLista}
              />
            ))
          ) : (
            <p>Não há Tarefas cadastrados!</p>
          )
        )}

        {!removeLoading && <Loading />}
        {removeLoading && tarefas.length === 0 && (
          <p>Não há Tarefas cadastrados!</p>
        )}

      </Container>

      {currentPage !== undefined && (
        <Pagination
          totalPages={Math.ceil((pesquisaAtiva ? pesquisaResultados.length : tarefas.length) / 12)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}

    </div>


  )
}

export default Tarefas