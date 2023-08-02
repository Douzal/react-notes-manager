import axios from 'axios';

const BASE_URL = 'http://localhost:3200/notes';

export class NoteAPI {

    static async create(note) {
        return this.noteIdToString((await axios.post(BASE_URL, note)).data);
    };

    static async fetchAll() {
        return (
            await axios.get(BASE_URL)
                .then((resp) => {
                    // console.log(resp);
                    // ! le .map(fn) permet de passer fn sur chaque élément du tableau
                    return resp.data.map(this.noteIdToString);
                })
                .catch((err) => {
                    console.log(err);
                })
        );
    };

    static async fetchById(noteId) {
        return (
            await axios.get(`${BASE_URL}/${noteId}`)
                .then((resp) => {
                    console.log(resp);
                    return this.noteIdToString(resp.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        );
    };

    static async deleteById(noteId) {
        return (
            await axios.delete(`${BASE_URL}/${noteId}`)
                .then((resp) => {
                    console.log(`Deleted note with id : ${noteId}`);
                })
                .catch((err) => {
                    console.log(err);
                })
        );
    };

    static async update(note) {
        return this.noteIdToString((
            (await axios.patch(`${BASE_URL}/${note.id}`, note)).data
        ));
    };

    static noteIdToString = (note) => {
        return { ...note, id: note.id.toString() };
    };
}