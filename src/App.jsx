import { NoteAPI } from "api/note-api.js";
import { Header } from "components/Header/Header.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setNoteList } from "store/note/note-slice.js";
import style from './style.module.css';

export function App() {

  const dispatch = useDispatch();

  const fetchNotes = async () => {
    //! récupération from server side
    const noteList = await NoteAPI.fetchAll();
    //! send to le store pour affichage en front
    dispatch(setNoteList(noteList));
  }
  // on ne peut pas faire d'asynchrone directement dans le useEffet
  useEffect(() => {
    fetchNotes();
  }, [])

  return (
    <div className='container-fluid'>
      <Header />
      <div className={style.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}
