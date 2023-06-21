import { takeEvery, put, all } from 'redux-saga/effects';
import axios from 'axios';

// Worker saga to handle fetching quests for a specific trader //
function* fetchTraderQuests(action) {
  try {
    const traderId = action.payload;
    const response = yield axios.get(`/api/quests/${traderId}`);
    const quests = response.data;
    yield put({ type: 'SET_TRADER_QUESTS', payload: quests });
  } catch (error) {
    console.log('error fetching quests', error);
  };
};

function* markQuestComplete(action) { // Handles marking a quest complete (adding to the user_quests table) //
  try {
    yield axios.post(`/api/quests/${action.payload.id}/complete`, action.payload);
    yield put({ type: 'MARK_QUEST_COMPLETE_SUCCESS', payload: action.payload.id });
  } catch (error) {
    console.log('error marking complete', error);
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
// Exporting the watcher saga to use in other files //
export default function* questsSaga() {
  yield all([
    watchFetchTraderQuests(),
    watchMarkQuestComplete(),
  ]);
};
