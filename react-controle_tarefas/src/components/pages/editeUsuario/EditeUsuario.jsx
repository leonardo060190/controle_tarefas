import styles from './EditeUsuario.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../layout/loading/Loading';
import Container from '../../layout/container/Container';
import UserForm from '../../form/userform/UserForm';
import { api } from '../../../../config/ConfigAxios';


function EditeUsuario() {
    const { id } = useParams();

    const [usuarios, setUsuarios] = useState([]);
    const [showUsuarioForm, setShowUsuarioForm] = useState(false);
    const [dadosForm, setDadosForm] = useState({});
    console.log("teste", usuarios);
    console.log("testeF", usuarios);


    useEffect(() => {
        async function obterUsuario() {
            try {
                const response = await api.get(`/usuarios/${id}`);
                console.log("teste3", response.data);
                setUsuarios(response.data);
                setDadosForm(response.data);
            } catch (error) {
                alert(`Erro: Não foi possível obter os dados: ${error}`);
            }
        }

        obterUsuario();
    }, [id]);



    async function editPost(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const nome = formData.get("nome");
        const sobrenome = formData.get("sobrenome");
        const email = formData.get("email");
        const senha = formData.get("senha");
       

        try {
            const response = await api.put(`/usuarios/${id}`, {
                nome,
                sobrenome,
                email,
                senha
                           });
            console.log("teste3", response.data);
            setUsuarios(response.data); // Atualize o estado com os dados atualizados
            setShowUsuarioForm(!showUsuarioForm);
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
        }
    }

    function toggleUsuarioForm() {
        setShowUsuarioForm(!showUsuarioForm);
    }

    return (
        <>
            {usuarios.id ? (
                <div className={styles.project_details}>
                    <Container pageClass="column">
                        <div className={styles.details_container}>
                            <h1>Usuario: {usuarios.nome} {usuarios.sobrenome}</h1>
                            
                            <button className={styles.btn} onClick={toggleUsuarioForm}>
                                {!showUsuarioForm ? 'Editar Tarefa' : 'Fechar'}
                            </button>
                            {!showUsuarioForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>E-mail: </span> {usuarios.email}
                                    </p>

                                    <p>
                                        <span>senha: </span> {usuarios.senha}
                                    </p>


                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <UserForm
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

export default EditeUsuario;
