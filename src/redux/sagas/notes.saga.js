import { takeEvery, all } from 'redux-saga/effects';
import axios from 'axios';
import { put } from 'redux-saga/effects';
// Worker saga to handle fetching notes //
function* fetchNotes(action) {
    try {
        const userId = action.payload;
        const response = yield axios.get(`/api/notes/${userId}`);
        const notes = response.data;
        // Dispatch an action to store the notes in Redux //
        yield put({ type: 'SET_NOTES', payload: notes });
    } catch (error) {
        console.log('error fetching notes:', error);
    };
};

// Worker saga to handle adding a new note //
function* addNote(action) {
    try {
        const { userId, title, description } = action.payload;
        yield axios.post(`/api/notes/newnote/${userId}`, { userId, title, description });
        // Dispatch an action to fetch updated notes //
        yield put({ type: 'FETCH_NOTES', payload: userId });
    } catch (error) {
        console.log('error adding a note', error);
    };
};

// Worker saga to handle updating an existing note //
function* updateNote(action) {
    try {
        const { noteId, userId, title, description } = action.payload;
        yield axios.put(`/api/notes/edit/${noteId}`, { userId, title, description });
        // Dispatch an action to fetch the updated notes //
        yield put({ type: 'FETCH_NOTES', payload: userId });
    } catch (error) {
        console.log('error updating a note', error);
    };
};

// Worker saga to handle deleting a note //
function* deleteNote(action) {
    try {
        const { noteId, userId } = action.payload;
        yield axios.delete(`/api/notes/delete/${noteId}`);
        // Dispatch an action to fetch the updated notes // 
        yield put({ type: 'FETCH_NOTES', payload: userId });
    } catch (error) {
        console.log('error deleting a note', error);
    };
};

// Watcher saga to listen for the action to fetch notes //
export function* watchFetchNotes() {
    yield takeEvery('FETCH_NOTES', fetchNotes);
};

// Watcher saga to listen for the action to add a new note //
export function* watchAddNote() {
    yield takeEvery('ADD_NOTE', addNote);
};

// Watcher saga to listen for the action to update a note //
export function* watchUpdateNote() {
    yield takeEvery('UPDATE_NOTE', updateNote);
};

// Watcher saga to listen for the action to delete a note //
export function* watchDeleteNote() {
    yield takeEvery('DELETE_NOTE', deleteNote);
};

// Export all watcher sagas as a single root saga to use inside of the _root.saga file //
export default function* notesSaga() {
    yield all([
        watchFetchNotes(),
        watchAddNote(),
        watchUpdateNote(),
        watchDeleteNote(),
    ]);
};
