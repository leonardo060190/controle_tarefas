import styles from './Tarefas.module.css'
import { useState, useEffect } from 'react';
import LinkButton from '../../layout/linkButton/LinkButton'
import Container from '../../layout/container/Container'
import TarefasCard from '../../card/tarefasCard/TarefasCard'
import Loading from '../../layout/loading/Loading'
import { api } from '../../../../config/ConfigAxios'
import { useForm } from 'react-hook-form'
import Pagination from '../../layout/paginação/Pagination';



function Tarefas() {

  const [tarefas, setTarefas] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      obterLista();
    }, 100)
  }, [currentPage]);

  const obterLista = async () => {
    try {
      const limitePorPagina = 12;
      const offset = (currentPage - 1) * limitePorPagina;
  
      const lista = await api.get(`/tarefas?_page=${currentPage}&_limit=${limitePorPagina}&_start=${offset}`);
      setTarefas(lista.data);
      setRemoveLoading(true);
    } catch (error) {
      alert(`Erro: Não foi possível obter os dados: ${error}`);
    }
  };

  const filtrarLista = async (campos) => {
    try {
      const lista = await api.get(`/tarefas/lista/${campos.titulo}`);
      console.log("filter", lista);

      const resultados = lista.data.data; // Ajuste aqui para acessar a propriedade 'data' que contém os resultados

      if (resultados > 0) {
        console.log("Tipo de resultados:", resultados);
        setTarefas(lista);
      } else {
        alert("Não há tarefas cadastradas com a palavra chave pesquisada");
      }
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



  return (

    <div className={styles.project_container}>

      <form onSubmit={handleSubmit((data) => filtrarLista(data))}>
        <input type="text" className="form-control" placeholder="Titulo" required {...register("titulo")} />
        <input type="submit" className={styles.form_control} value="Pesquisar" />
      </form>


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
            tipo={tarefa.tipo}
            data_criacao={tarefa.data_criacao}
            data_limite={tarefa.data_limite}
            handleRemove={removeTarefa}
            handleSubmit={filtrarLista}

          />
        ))}
        {!removeLoading && <Loading />}
        {removeLoading && tarefas.length === 0 && (
          <p>Não há Tarefas cadastrados!</p>
        )}

      </Container>

      <Pagination
        totalPages={Math.ceil(tarefas.length / 12)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </div>


  )
}

export default Tarefas