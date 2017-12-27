import { GET_CHARACTERS } from '../IStore';
import { takeEvery, call } from 'redux-saga/effects';

export function* getCharactersSaga() {
  try {
    const response = yield call(fetch, 'http://localhost:4444/api/comicvine/marvel/characters');
    console.log(response);
  } catch (e) {
    console.warn('error', e);
  }
};

// Watcher sagas
export default function* watchGetCharacters() {
  console.log('redux-saga is running the action listener: ', GET_CHARACTERS);
  yield takeEvery(GET_CHARACTERS, getCharactersSaga);
};
