import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from '../Containers/App/reducers';
import sagas from '../Containers/App/sagas';

const loggerMiddleware = createLogger();

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, loggerMiddleware)(createStore);

export default (initialState) => {
	const store = createStoreWithMiddleware(reducer, initialState);
	sagaMiddleware.run(sagas);
	return store;
};
