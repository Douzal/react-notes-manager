import style from './style.module.css';

export const ButtonPrimary = ({ children, handleClick, isNotClickable }) => {
    return (
        <button
            type='button'
            disabled={isNotClickable}
            className={`btn btn-primary ${style.button}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}