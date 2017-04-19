import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from '../Containers/App/reducers';

const loggerMiddleware = createLogger({
	stateTransformer: state => state.toJS(),
});

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, loggerMiddleware)(createStore);

export default (initialState) => {
	const store = createStoreWithMiddleware(reducer, initialState);
	store.runSaga = sagaMiddleware.run;
	return store;
};
