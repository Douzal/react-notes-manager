import { NoteAPI } from "api/note-api.js";
import { deleteNote } from 'store/note/note-slice.js';

import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.css';
import { TextCard } from 'components/TextCard/TextCard.js';
import { Link, useNavigate } from 'react-router-dom';

export const NoteList = ({ inputNoteList }) => {

    const noteList = useSelector(store => store.NOTE.noteList);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateTo = (url) => {
        navigate(url);
    }

    const deleteNote_ = (note) => {
        // get la fonction qui delete
        if (window.confirm('Suppression ?')) {
            // maj du back
            NoteAPI.deleteById(note.id);
            // maj du front
            dispatch(deleteNote(note));
        }
    }

    // // en vrai pas utile car si déclaré, inputNoteList aura une lenght
    // const listToRender = inputNoteList?.length>0 ?
    // inputNoteList : ;

    const redirectlink = <Link to='/note/new'>there</Link>;

    return (
        <div className={`row justify-content-center ${style.cards_container}`}>
            {
                inputNoteList.length > 0 ?
                    inputNoteList.map((note) => {
                        return (
                            <div key={note.id} className={`${style.card_container}`}>
                                <TextCard
                                    title={note.title}
                                    subtitle={note.subtitle}
                                    content={note.content}
                                    onClick={() => navigateTo(`note/${note.id}`)}
                                    onClickTrash={() => deleteNote_(note)}
                                />
                            </div>
                        );
                    })
                    : <div className={`d-flex justify-content-center text-white`}>
                        <span>
                            Add your first note ? You can click {redirectlink} !
                        </span>
                    </div>
            }
        </div>
    );
}