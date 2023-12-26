import styles from './EditeUsuario.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../layout/loading/Loading';
import Container from '../../layout/container/Container';
import UserEditeForm from '../../editeForm/userEditeForm/UserEditeForm';
import { api } from '../../../../config/ConfigAxios';


function EditeUsuario() {
    const { id } = useParams();

    const [usuarios, setUsuarios] = useState([]);
    const [showUsuarioForm, setShowUsuarioForm] = useState(false);
    const [dadosForm, setDadosForm] = useState({});
   


    useEffect(() => {
        async function obterUsuario() {
            try {
                const response = await api.get(`/usuarios/${id}`);
                setUsuarios(response.data);
                setDadosForm(response.data);
            } catch (error) {
                alert(`Erro: Não foi possível obter os dados: ${error}`);
            }
        }

        obterUsuario();
    }, [id]);


    async function editPost(formData) {
        try {
            const response = await api.patch(`/usuarios/${id}`, formData);
            console.log('Data updated successfully:', response.data);
            setUsuarios(response.data);
            setShowUsuarioForm(!showUsuarioForm);
        } catch (error) {
            console.error('Error updating data:', error);
            
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
                            <h1>{usuarios.nome} {usuarios.sobrenome}</h1>

                            <button className={styles.btn} onClick={toggleUsuarioForm}>
                                {!showUsuarioForm ? 'Editar Tarefa' : 'Fechar'}
                            </button>
                            {!showUsuarioForm ? (
                                <div className={styles.project_info}>
                                    
                                    <p>
                                        <span>E-mail: </span> {usuarios.email}
                                    </p>

                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <UserEditeForm
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

export default EditeUsuario;
