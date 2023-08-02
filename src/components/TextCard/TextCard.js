import { useState } from 'react';
import style from './style.module.css';
import { Trash as TrashIcon } from 'react-bootstrap-icons';

export const TextCard = ({ ...props }) => {
    // console.log(props);
    const [isCardHovered, setIsCardHovered] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);

    // éviter la propagation
    //  éviter que l'évenemnt du click note soit
    // aussi déclanché lors du click poubelle
    const onClickTrash_ = (e) => {
        props.onClickTrash();
        e.stopPropagation();
    }
    
    return (
        <div
            onClick={props.onClick}
            className={`card ${style.container} ${isCardHovered && style.cardHovered}`}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
        >
            <div className="card-body">
                <div className={style.title_row}>
                    <h5 className="card-title">{props.title}</h5>
                    <TrashIcon
                        size={20}
                        onClick={onClickTrash_}
                        onMouseEnter={() => setIsTrashHovered(true)}
                        onMouseLeave={() => setIsTrashHovered(false)}
                        style={{ color: isTrashHovered ? '#FF7373' : '#B8B8B8' }}
                    />
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                <p className={`card-text ${style.text_content}`}>{props.content}</p>
            </div>
        </div>
    );
}