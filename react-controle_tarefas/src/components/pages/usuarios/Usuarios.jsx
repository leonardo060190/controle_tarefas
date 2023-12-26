import styles from './Usuarios.module.css'
import { useState, useEffect } from 'react';
import Container from '../../layout/container/Container'
import UsuariosCard from '../../card/usuariosCard/UsuariosCard'
import Loading from '../../layout/loading/Loading'
import { api } from '../../../../config/ConfigAxios'
import Pagination from '../../layout/paginacao/Pagination'
import SubmitButton from '../../itensFrom/button/SubmitButton'
import { useForm } from 'react-hook-form'
import LinkButton from '../../layout/linkButton/LinkButton'



function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);
  const [pesquisaResultados, setPesquisaResultados] = useState([]);
  const [pesquisaAtiva, setpesquisaAtiva] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    setTimeout(() => {
      if (pesquisaAtiva) {
        // Se a pesquisa está ativa, exibir resultados da pesquisa
        setUsuarios(pesquisaResultados);
        // Se não, obter a lista completa
      } else {
        obterLista();
      }
    }, 100);
  }, [currentPage, pesquisaAtiva, pesquisaResultados]);

  const voltarALista = () => {
    setpesquisaAtiva(false);
    obterLista();
  };


  const obterLista = async () => {
    try {
      const limitePorPagina = 10;
      const offset = (currentPage - 1) * limitePorPagina;

      const lista = await api.get(`/usuarios?_limit=${limitePorPagina}&_start=${offset}`);
      setUsuarios(lista.data);
      setRemoveLoading(true)
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
  };


  const filtrarLista = async (campos) => {
    try {
      const response = await api.get(`/usuarios/lista/${campos.nome}`);
      
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
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
  };

  const removeUsuario = async (id) => {
    if (!window.confirm(`Confirma a exclusão do Usuário ?`)) {
      return;
    }
    try {
      await api.delete(`/usuarios/${id}`);
      //formar uma nova lista de tarefas sem a tarefa que foi excluida
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));

    } catch (error) {
      alert(`Erro: ..Não foi possível excluir a usuário ${id}: ${error}`);
    }
  }

  const limparFormulario = () => {
    reset({
        nome: ""
    });
};

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const usuariosToDisplay = (pesquisaAtiva ? pesquisaResultados : usuarios).slice(startIndex, endIndex)



  return (

    <div className={styles.usuario_container}>

      <form className={styles.form} onSubmit={handleSubmit((data) => filtrarLista(data))}>
        <input type="text" className={styles.form_control} placeholder="nome" required {...register("nome")} />
        <SubmitButton text='Pesquisa' />

        {pesquisaAtiva && (
          <button className={styles.button_voltar} onClick={voltarALista}>Voltar à Lista</button>
        )}
      </form>

      <div className={styles.title_container}>
        <h1>Usuarios</h1>

        <LinkButton to="/cadastroUser" text="Adicionar Usuário" />
      </div>

      <Container pageClass="start">
        {pesquisaAtiva ? (
          pesquisaResultados.length > 0 ? (
            pesquisaResultados.map((usuario) => (
              <UsuariosCard
                key={usuario.id}
                id={usuario.id}
                nome={usuario.nome}
                sobrenome={usuario.sobrenome}
                email={usuario.email}
                handleRemove={removeUsuario}
                handleSubmit={filtrarLista}

              />
            ))
            ) : (
              <p>Nenhum resultado encontrado.</p>
            )
          ) : (
            usuariosToDisplay.length > 0 ? (
              usuariosToDisplay.map((usuario) => (
                <UsuariosCard
                key={usuario.id}
                id={usuario.id}
                nome={usuario.nome}
                sobrenome={usuario.sobrenome}
                email={usuario.email}
                handleRemove={removeUsuario}
                handleSubmit={filtrarLista}

              />
              ))
              ) : (
                <p>Não há Tarefas cadastrados!</p>
              )
            )}
        {!removeLoading && <Loading />}
        {removeLoading && usuarios.length === 0 && (
          <p>Não há Usuários  cadastrados!</p>
        )}
      </Container>

      {currentPage !== undefined && (
        <Pagination
          totalPages={Math.ceil((pesquisaAtiva ? pesquisaResultados.length : usuarios.length) / 10)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
   
  )
}

export default Usuarios