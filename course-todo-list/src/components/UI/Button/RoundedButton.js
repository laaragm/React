import styles from './RoundedButton.module.css';

export function RoundedButton(props) {
    return(
        <button 
            type={ props.type }
            className={ styles.button }
            onClick={ props.onClick }
        >
            { props.children }
        </button>
    );
}