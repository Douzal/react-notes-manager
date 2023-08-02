import { ButtonPrimary } from 'components/ButtonPrimary/ButtonPrimary.jsx';
import style from './style.module.css';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import { ValidatorService } from 'services/form-validator.js';
import FieldError from 'components/FieldError/FieldError.jsx';

//! mieux d'utiliser Formik ou autre module non ?
const VALIDATORS = {
    title: (titre) => {
        return (ValidatorService.setMinchar(titre, 3)
            || ValidatorService.setMaxchar(titre, 20));
    },
    content: (content) => {
        return (ValidatorService.setMinchar(content, 5)
            || ValidatorService.setMaxchar(content, 200));
    }
}

export const NoteForm = ({ title, handleClickEdit, handleClickTrash, handleSubmit, editMode = true, note, createMode = false }) => {

    const [formValues, setFormValues] = useState({
        title: note?.title,
        content: note?.content
    });

    //! e.target.name sera la clef de l'objet, comme on veut l'utiliser en tant
    //! que variable dans un objet on met les []
    //! donc ici title OU content puisque la fonction peut être appelée par les deux inputs
    const updateFormValues = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
        validateInput(e.target.name, e.target.value);
    }

    // GESTION DES ERREURS DE VAL
    // nb : message n'apparait pas si undefined, mais si title ou content vaut chaine vide
    // alors ça show l'erreur
    const [formErrors, setFormErrors] = useState({
        title: note?.title ? undefined : '',
        content: note?.content ? undefined : ''
    });

    // used to display err messages
    const validateInput = (field, value) => {
        setFormErrors({
            ...formErrors,
            [field]: VALIDATORS[field](value)
        });
    }
    // allows btn to be clickable or not
    const hasError = () => {
        return (Object.values(formErrors).some((err) => err !== undefined));
    }

    //! Semi-composants en jsx pour plus de lisibilité, qu'on incorpore dans le composant après
    const actionIcons = (<>
        <div className='col-1'>
            {/* handleClickEdit && -> TRUE if event detected */}
            {
                handleClickEdit && !editMode &&
                <PencilFill onClick={handleClickEdit} className={style.icon} />
            }
        </div>
        <div className='col-1'>
            {
                handleClickTrash &&
                <TrashFill onClick={handleClickTrash} className={style.icon} />
            }
        </div>
    </>
    );
    const titleIpt = (<div className='mb-5'>
        <label htmlFor='title' className="form-label mb-3">Title</label>
        <input
            type="text"
            value={formValues.title}
            onChange={(e) => updateFormValues(e)}
            name='title'
            className={'form-control'}
        />
        <FieldError>{formErrors.title}</FieldError>

    </div>);
    const contentIpt = (<div className='mb-5'>
        <label className="form-label" htmlFor='content'>Content</label>
        <textarea
            type="text"
            value={formValues.content}
            onChange={(e) => updateFormValues(e)}
            name='content'
            className={'form-control'}
            rows='5' />
        <FieldError>{formErrors.content}</FieldError>
    </div>);
    const submitBtn = (
        <div className={style.submitBtn}>
            {
                (handleSubmit || editMode) &&
                <ButtonPrimary
                    isNotClickable={hasError()}
                    handleClick={() => handleSubmit(formValues)} >
                    {(editMode && !createMode) ? 'Edit' : 'Submit'}
                </ButtonPrimary>
            }
        </div>
    );

    return (
        <form className={style.container}>
            <div className={`row justify-content-space-between`}>
                <div className='col-10'>
                    {/* TITLE */}
                    <h2 className="mb-3">{title}</h2>
                </div>
                {/* ICONES */}
                {actionIcons}
            </div>
            {/* INPUT (TITLE) */}
            <div className={`mb-3 ${style.title_input_container}`} >{editMode && titleIpt}</div>
            {/* INPUT (CONTENT) */}
            <div className='mb-3'>{editMode ? contentIpt : <pre>{note.content}</pre>}</div>
            {submitBtn}
        </form>
    );
}
