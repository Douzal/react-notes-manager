import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "App";
import { Logo } from "components/Logo/index.jsx";
import { Note } from "pages/Note/Note.jsx";
import { NoteCreate } from "pages/NoteCreate/NoteCreate.js";
import { PageNotFound } from "pages/PageNotFound/PageNotFound.js";
import { StrictMode } from "react";

import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { NoteBrowse } from "pages/NoteBrowse/NoteBrowse.js";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/' element={<NoteBrowse />} />
            <Route path='/note/:id' element={<Note />} />
            <Route path='/note/new' element={<NoteCreate />} />
            <Route path='/*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
);