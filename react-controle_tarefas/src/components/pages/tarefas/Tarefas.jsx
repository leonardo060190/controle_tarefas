import styles from './Tarefas.module.css'
import { useState, useEffect } from 'react';
import LinkButton from '../../layout/linkButton/LinkButton'
import Container from '../../layout/container/Container'
import TarefasCard from '../../card/tarefasCard/TarefasCard'
import Loading from '../../layout/loading/Loading'
import { api } from '../../../../config/ConfigAxios'
//import { useForm } from 'react-hook-form'



function Tarefas() {

  const [tarefas, setTarefas] = useState([]);
  console.log(setTarefas)
  const [removeLoading, setRemoveLoading] = useState(false);
  //const { register, handleSubmit } = useForm();

  useEffect(() => {
    setTimeout(() => {
      obterLista();
    }, 100)
  }, []);

  const obterLista = async () => {
    try {
      const lista = await api.get("/tarefas");
      setTarefas(lista.data);
      //console.log(lista)
      setRemoveLoading(true)
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
  };


  // const filtrarLista = async (campos) => {
  //   try {
  //     const lista = await api.get(`/tarefas/lista/${campos.titulo}`);
  //     lista.data.length
  //     console.log("filter", lista)
  //       ? setTarefas(lista.data)
  //       : alert("Não há tarefas cadastradas com a palavra chave pesquisada");
  //   } catch (error) {
  //     alert(`Erro: ..Não foi possível obter os dados: ${error}`);
  //   }
  // }

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
        <div className={styles.title_container}>
          <h1>Tarefas</h1>
          
          <LinkButton to="/novaTarefa" text="Criar Tarefa" />
        </div>
        {/* <form  onSubmit={handleSubmit(filtrarLista)}>
            <input type="text" className="form-control" placeholder="Titulo" required {...register("titulo")} />
            <input type="submit" className={styles.form_control} value="Pesquisar" />
          </form> */}
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
              //handleSubmit={filtrarLista}

            />
          ))}
          {!removeLoading && <Loading />}
          {removeLoading && tarefas.length === 0 && (
            <p>Não há Tarefas cadastrados!</p>
          )}



        </Container>
      </div>
    

  )
}

export default Tarefas