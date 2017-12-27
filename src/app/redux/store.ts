const appConfig = require('../../../config/main');
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { IStore } from './IStore';
import rootSaga from './sagas/sagas';

export function configureStore(history, initialState?: IStore): Redux.Store<IStore> {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Redux.Middleware[] = [
    routerMiddleware(history),
    thunk,
    sagaMiddleware,
  ];

  /** Add Only Dev. Middlewares */
  if (appConfig.env !== 'production' && process.env.BROWSER) {
    const logger = createLogger();
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
