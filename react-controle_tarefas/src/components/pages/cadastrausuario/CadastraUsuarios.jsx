
import styles from './CadastraUsuario.module.css'
import UserForm from '../../form/userform/UserForm'

function CadastraUsuario() {
    return (
        <div className={styles.novatarefas_container}>
            <h1>Adicionar novo usuario</h1>
            <p>Adicione novos usuarios no app!</p>
            <UserForm  btnText="Adicionar Usuario"/>
        </div>
    )
}

export default CadastraUsuario
