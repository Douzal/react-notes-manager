// import style from './style.module.css';
import { NoteList } from 'containers/NoteList/NoteList.jsx';
import { SearchBar } from 'components/SearchBar/SearchBar.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const NoteBrowse = () => {

    const [searchTxt, setSearchTxt] = useState('');
    const noteList = useSelector(store => store.NOTE.noteList);

    const filteredList = (noteList.filter((note, i) => {
        const searchTxtUpperCase = searchTxt.toUpperCase();
        return (
            note.content.toString().toUpperCase().includes(searchTxtUpperCase)
            || note.title.toString().toUpperCase().includes(searchTxtUpperCase)
        )
    }));

    return (
        <>
            <div className="row justify-content-center mb-5">
                <div className="col-sm-12 col-md-4">
                    <SearchBar
                        placeholder='Search your notes...'
                        onTxtChange={setSearchTxt} />
                </div>
            </div>
            <NoteList inputNoteList={filteredList} />
        </>
    );
}