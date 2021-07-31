import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime';
import rootSaga from './watchers';
import theme from './reducers/theme.reducer';
import metamask, { intiMetaMask } from './reducers/metamsk.reducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	// eslint-disable-next-line no-undef
	(process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose) ||
	compose;
export const store = createStore(
	combineReducers({
		theme,
		metamask,
	}),
	composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

intiMetaMask(store.dispatch);
