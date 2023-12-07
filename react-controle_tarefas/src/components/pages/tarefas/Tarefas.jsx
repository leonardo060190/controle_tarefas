import styles from './Tarefas.module.css'
import { useState, useEffect } from 'react';
import LinkButton from '../../layout/linkButton/LinkButton'
import Container from '../../layout/container/Container'
import TarefasCard from '../../form/tarefasCard/TarefasCard'
import Loading from '../../layout/loading/Loading'
import { api } from '../../../../config/ConfigAxios'


function Tarefas() {

  const [tarefas, setTarefas] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      obterLista();
    }, 100)
  }, []);

  const obterLista = async () => {
    try {
      const lista = await api.get("/tarefas");
      setTarefas(lista.data);
      console.log(lista)
      setRemoveLoading(true)
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
  };

  const removeTarefa = async (id, titulo) => {
    if (!window.confirm(`Confirma a exclusão do Tarefa ${titulo}?`)) {
      return;
    }
    try {
      await api.delete(`tarefas/${id}`);
      //formar uma nova lista de tarefas sem a tarefa que foi excluida
      setTarefas(tarefas.filter(tarefas => tarefas.id !== id));

    } catch (error) {
      alert(`Erro: ..Não foi possível excluir a tarefa ${titulo}: ${error}`);
    }
  }



  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
      {/* <div className="col-sm-5">
                {/* <form >
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Titulo" required />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:""});obterLista();}}/>
                    </div>
                </form>
            </div> */}
        <h1>Tarefas</h1>
        <LinkButton to="/novaTarefa" text="Criar Tarefa" />
      </div>
      <Container pageClass="start">
        {tarefas.length > 0 && tarefas.map((tarefa) => (
          <TarefasCard
            key={tarefa.id ? tarefa.id : tarefas.indexOf(tarefa)}
            id={tarefa.id}
            titulo={tarefa.titulo}
            descricao={tarefa.descricao}
            status={tarefa.status}
            data_criacao={tarefa.data_criacao}
            data_limite={tarefa.data_limite}
            handleRemove={removeTarefa}

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