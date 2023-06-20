import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Worker saga to handle fetching quests for a specific trader
function* fetchTraderQuests(action) {
  try {
    const traderId = action.payload;
    const response = yield axios.get(`/api/quests/${traderId}`);
    const quests = response.data;
    yield put({ type: 'SET_TRADER_QUESTS', payload: quests });
  } catch (error) {
   console.log('error fetching quests', error);
  }
}

// Watcher saga to listen for the FETCH_TRADER_QUESTS action
function* watchFetchTraderQuests() {
  yield takeEvery('FETCH_TRADER_QUESTS', fetchTraderQuests);
}

// Exporting the Watcher saga to use in other files
export default [
    watchFetchTraderQuests
];
