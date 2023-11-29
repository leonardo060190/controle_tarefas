import styles from './Container.module.css'

function Container(props) {

    return (
        <div className={`${styles.container} ${styles[props.pageClass]}`}>
            {props.children}
        </div>

    )

}

export default Container