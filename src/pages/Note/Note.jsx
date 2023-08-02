import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.css';
import { NoteForm } from 'containers/NoteForm/NoteForm.jsx';
import { useState } from 'react';
import { NoteAPI } from 'api/note-api.js';
import { deleteNote, updateNote } from 'store/note/note-slice.js';

export const Note = () => {

    const { id } = useParams();
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const note = useSelector((store) => store.NOTE.noteList)
        .find((note) => note.id === id);

    const deleteNote_ = (note) => {
        const deletion = window.confirm('Sur de vouloir delete ?');
        if (deletion) {
            // maj du back
            NoteAPI.deleteById(note.id);
            // maj du front
            dispatch(deleteNote(note))
            navigate('/');
        }
    }

    const editNote = async (formValues) => {
        // console.log(formValues);
        // modifier la base
        const updatedNote = await NoteAPI.update({ ...formValues, id: note.id });

        dispatch(updateNote(updatedNote));
        setIsEditable(false);
    }

    return (
        <>
            {
                note &&
                <NoteForm
                    title={isEditable ? 'Edit note' : note.title}
                    editMode={isEditable}
                    note={note}
                    handleClickEdit={() => setIsEditable(!isEditable)}
                    handleClickTrash={() => deleteNote_(note)}
                    handleSubmit={isEditable && editNote}
                />
            }
        </>
    );
}