
import styles from './CadastraUsuario.module.css'
import UserForm from '../../form/userform/UserForm'

function CadastraUsuario() {
    return (
        <div className={styles.cadastroUser_container}>
            <h1>Cadastro de novo usúario</h1>
            <p>Para cadastro de novo usúario preencha o formulário!</p>
            <UserForm  btnText="Adicionar Usúario"/>
        </div>
    )
}

export default CadastraUsuario
