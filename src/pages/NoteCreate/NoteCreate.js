import { NoteForm } from 'containers/NoteForm/NoteForm.jsx';
import style from './style.module.css';
import { NoteAPI } from '../../api/note-api.js';
import { useDispatch } from 'react-redux';
import { addNote } from "store/note/note-slice.js";
import { useNavigate } from 'react-router-dom';
// import { Utils } from 'Utils.js';

export const NoteCreate = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const navigateTo = (url) => {
        navigate(url);
    }
    
    const createNote = async(formDatas) => {
        // TODO add in "base"
        const newNote = {...formDatas, created_at: new Date().toLocaleDateString()};
        const note = await NoteAPI.create(newNote);
        // TODO add dans le front (store)
        dispatch(addNote(note));
        // Utils.navigateTo('/');
        navigateTo('/');
    }

    return (
        <>
            <NoteForm
                title='Create a note'
                handleSubmit={
                    (formValues) => createNote(formValues)
                }
                createMode={true}
            // handleClickTrash={false}
            // handleClickEdit={false}
            />
        </>
    );
}