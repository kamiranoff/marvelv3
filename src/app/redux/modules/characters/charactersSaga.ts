import { GET_FAILURE, GET_REQUEST, GET_SUCCESS } from './index';
import { takeEvery, call, put } from 'redux-saga/effects';

export function* getCharactersSaga(action) {
  try {
    console.log(action);
    const response = yield call(fetch, 'http://localhost:4444/api/comicvine/marvel/characters');
    console.log(response);
    yield  put({ type: GET_SUCCESS, response });
  } catch (error) {
    yield  put({ type: GET_FAILURE, error });
  }
};

// Watcher sagas
export default function* watchGetCharacters() {
  console.log('redux-saga is running the action listener: ', GET_REQUEST);
  yield takeEvery(GET_REQUEST, getCharactersSaga);
};
