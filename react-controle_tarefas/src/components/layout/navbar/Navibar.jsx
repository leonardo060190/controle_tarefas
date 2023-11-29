import { Link } from 'react-router-dom';
import Container from '../container/Container';
import styles from './Navbar.module.css'
import logo from '../../../assets/costs_logo.png'


function Navbar() {

    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to='/'><img src={logo} alt='Tasks' /></Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to='/'>Home</Link></li>
                    <li className={styles.item}><Link to='/tasks'>Tarefas</Link></li>
                </ul>
            </Container>

        </nav>
    )
}

export default Navbar

