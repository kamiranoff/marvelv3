const appConfig = require('../../../config/main');
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { IStore } from './IStore';
import rootSaga from './sagas';

export function configureStore(history, initialState?: IStore): Redux.Store<IStore> {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Redux.Middleware[] = [
    routerMiddleware(history),
    thunk,
    sagaMiddleware,
  ];

  /** Add Only Dev. Middlewares */
  if (appConfig.env !== 'production' && process.env.BROWSER) {
    const logger = createLogger({
      collapsed: true, // takes a Boolean or optionally a Function that receives `getState`
      // function for accessing current store state and `action` object as parameters.
      // Returns `true` if the log group should be collapsed, `false` otherwise.
      duration: true, // print the duration of each action?
      timestamp: false, // print the timestamp with each action?
      diff: true, // (alpha) show diff between states?
    });
    middlewares.push(logger);
  }

  const composeEnhancers = (appConfig.env !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store: Redux.Store<IStore> = createStore<IStore>(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
  ));

  if (appConfig.env === 'development' && (module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      store.replaceReducer((require('./reducers')));
    });
  }
  sagaMiddleware.run(rootSaga);

  return store;
}
