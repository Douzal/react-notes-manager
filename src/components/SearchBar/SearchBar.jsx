import style from './style.module.css';
import { Search as SearchIcon } from 'react-bootstrap-icons';

export const SearchBar = ({ placeholder, onTxtChange }) => {
    return (
        <>
            <SearchIcon
                size={25}
                className={`${style.searchIcon}`}
            />
            <input
                type='text'
                className={style.input}
                onChange={(e) => onTxtChange(e.target.value)}
                placeholder={placeholder}
            />
        </>
    );
};