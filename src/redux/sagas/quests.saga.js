import { takeEvery, put, all } from 'redux-saga/effects';
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
    yield axios.post(`/api/quests/${action.payload.id}/complete`, action.payload); // POST request for posting to database //
  } catch (error) {
    console.log('error marking complete', error); // Logging any errors to the console //
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
// Exporting the watcher sagas to use in other files //
export default function* questsSaga() {
  yield all([
    watchFetchTraderQuests(),
    watchMarkQuestComplete(),
  ]);
};
