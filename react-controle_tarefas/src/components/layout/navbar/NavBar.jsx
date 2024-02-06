import { Link } from 'react-router-dom';
import Container from '../container/Container';
import styles from './Navbar.module.css'
// import logo from '../../../assets/logo-controle-tarefas.png'


function Navbar() {

    const handleLogout = () => {
        // Perform logout logic (e.g., send API request, clear user data)
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <nav className={styles.navbar}>
            <Container>
                {/* <Link to='/home'><img  src={logo} alt='Tasks' /></Link> */}
                <div className={styles.texto}> Controle Tarefas </div>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to='/home'>Home</Link></li>
                    <li className={styles.item}><Link to='/tarefas'>Tarefas</Link></li>
                    <li className={styles.item}><Link to='/usuarios'>Usuários</Link></li>
                    <li className={styles.item}> <Link to='/login' onClick={handleLogout}>logout</Link></li>
                </ul>
            </Container>

        </nav>
    )
}

export default Navbar

