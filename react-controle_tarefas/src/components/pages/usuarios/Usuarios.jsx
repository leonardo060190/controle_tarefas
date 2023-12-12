import styles from './Usuarios.module.css'
import { useState, useEffect } from 'react';
import LinkButton from '../../layout/linkButton/LinkButton'
import Container from '../../layout/container/Container'
import UsuariosCard from '../../form/usuariosCard/UsuariosCard'
import Loading from '../../layout/loading/Loading'
import { api } from '../../../../config/ConfigAxios'
import { useForm } from 'react-hook-form'




function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setTimeout(() => {
      obterLista();
    }, 100)
  }, []);

  const obterLista = async () => {
    try {
      const lista = await api.get("/usuarios");
      setUsuarios(lista.data);
      console.log(lista.data)
      setRemoveLoading(true)
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
  };


  const filtrarLista = async (campos) => {
    try {
      const lista = await api.get(`/usuarios/${campos.nome}`);
      lista.data.length
      console.log("filter",lista.data)
        ? setUsuarios(lista.data)
        : alert("Não há Usuario cadastrado com a palavra chave pesquisada");
    } catch (error) {
      alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
  }

  const removeUsuario = async (id) => {
    if (!window.confirm(`Confirma a exclusão do Usuário ${id}?`)) {
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



  return (

    <div className="col-sm-5">
      <form onSubmit={handleSubmit(filtrarLista)}>
        <input type="text" className="form-control" placeholder="Nome" required {...register("nome")} />
        <input type="submit" className="btn btn-primary" value="Pesquisar" />
      </form>

      <div className={styles.usuario_container}>
        <div className={styles.title_container}>
          <h1>Usuarios</h1>
          <LinkButton to="/cadastroUser" text="Adicionar Usuário" />
        </div>
        <Container pageClass="start">
          {usuarios.length > 0 && usuarios.map((usuario) => (
            <UsuariosCard
              key={usuario.id}
              id={usuario.id}
              nome={usuario.nome}
              sobrenome={usuario.sobrenome}
              //senha={usuario.senha}
              email={usuario.email}
              handleRemove={removeUsuario}
              handleSubmit={filtrarLista}

            />
          ))}
          {!removeLoading && <Loading />}
          {removeLoading && usuarios.length === 0 && (
            <p>Não há Usuários  cadastrados!</p>
          )}
        </Container>
      </div>
    </div>

  )
}

export default Usuarios