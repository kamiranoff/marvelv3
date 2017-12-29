import { all } from 'redux-saga/effects';

// 1. worker sagas
import watchGetCharacters from './modules/characters/charactersSaga';

// 2. watcher sagas

// 3. our root saga - single entry point.
export default function* rootSaga() {
  yield all([
    watchGetCharacters(),
  ]);
};
