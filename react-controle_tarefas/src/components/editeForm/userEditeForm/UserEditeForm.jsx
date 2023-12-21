
import { useForm } from "react-hook-form";
import { api } from "../../../../config/ConfigAxios";
import { useEffect } from "react";
import SubmitButton from '../../itensFrom/button/SubmitButton';
import styles from "./UserEditeForm.module.css"
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";



const UserEditeForm = ({ btnText, dadosForm }) => {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();


    useEffect(() => {
        if (dadosForm) {
            // Set the default values for the form fields when dadosForm is defined
            setValue('nome', dadosForm.nome);
            setValue('sobrenome', dadosForm.sobrenome);
            setValue('senha');
            setValue('email', dadosForm.email);
        }
    }, [dadosForm, setValue]);


    const onSubmit = async (data) => {
        try {
            const response = await api.patch(`/usuarios/${dadosForm.id}`, data);
            console.log('Data updated successfully:', response.data);
            navigate(`/usuarios`);
            // You might want to do something after a successful update
        } catch (error) {
            console.error('Error updating data:', error);
            // Handle the error appropriately
        }
    };




    //aqui é o que vai ser exibido em tela
    return (
        <>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_control}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" className="form-control" id="nome" placeholder="Digite o nome"
                        required autoFocus {...register("nome")} />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input type="text" className="form-control" id="sobrenome" placeholder="Digite o sobrenome"
                        required {...register("sobrenome")} />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" className="form-control" id="email" placeholder="Informe o e-mail"
                        required {...register("email")} />
                </div>
                <div className={styles.form_control}>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className="form-control" maxLength={8} id="senha" placeholder="Digite uma nova senha"
                        required {...register("senha")} />
                </div>

                <div className={styles.aling_button}>

                    <SubmitButton text={btnText} />



                    <input type="reset" className={styles.btn_limpa}
                        value="Limpar Form" />
                </div>
            </form>
            <div className="alert"></div>
        </>
    )
}
UserEditeForm.propTypes = {
    btnText: PropTypes.string.isRequired,
    dadosForm: PropTypes.oneOfType([
        PropTypes.object,  // Assuming dadosForm is an object
        PropTypes.func,    // or PropTypes.func if it should be a function
    ]),
};

export default UserEditeForm;