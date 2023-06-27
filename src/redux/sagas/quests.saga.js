import { takeEvery, put, all, take } from 'redux-saga/effects';
import axios from 'axios';

// Worker saga to handle fetching quests for a specific trader //
function* fetchTraderQuests(action) {
  try {
    const traderId = action.payload;
    const response = yield axios.get(`/api/quests/${traderId}`); // GET request to display specific trader quests on each page //
    const quests = response.data;
    yield put({ type: 'SET_TRADER_QUESTS', payload: quests }); // Setting quests for the Redux store to hold //
  } catch (error) {
    console.log('error fetching quests', error); // Logging any errors to the console //
  };
};

function* markQuestComplete(action) { // Handles marking a quest complete (adding to the user_quests table) //
  try {
    const { questId, traderId } = action.payload
    yield axios.post(`/api/quests/${questId}/complete`, { traderId }); // POST request for posting to database //
    yield put({ type: 'FETCH_TRADER_QUESTS', payload: traderId }) // Calling FETCH_TRADER_QUESTS to retrieve the updated list //
  } catch (error) {
    console.log('error marking complete', error); // Logging any errors to the console //
  }
}

function* undoMarkQuestComplete(action) {
  try {
    const { questId, traderId } = action.payload;
    yield axios.delete(`/api/quests/${questId}/undo`, { questId }); // DELETE request for removing a quest from user_quests table //
    yield put({ type: 'FETCH_TRADER_QUESTS', payload: traderId }); // Calling FETCH_TRADER_QUESTS to retrieve the updated list //
  } catch (error) {
    console.log('error undoing quest completion entry', error);
  }
}

// Watcher saga to listen for the FETCH_TRADER_QUESTS action //
function* watchFetchTraderQuests() {
  yield takeEvery('FETCH_TRADER_QUESTS', fetchTraderQuests)
};
// Watcher saga to listen for the MARK_COMPLETE action //
function* watchMarkQuestComplete() {
  yield takeEvery('MARK_COMPLETE', markQuestComplete)
}
function* watchUndoMarkQuestComplete() {
  yield takeEvery('UNDO_COMPLETION', undoMarkQuestComplete)
}
// Exporting the watcher sagas to use in other files //
export default function* questsSaga() {
  yield all([
    watchFetchTraderQuests(),
    watchMarkQuestComplete(),
    watchUndoMarkQuestComplete(),
  ]);
};
