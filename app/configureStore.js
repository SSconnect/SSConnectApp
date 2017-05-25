import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import devTools from 'remote-redux-devtools'

import reducer from './reduxs/reducers'
import sagas from './reduxs/sagas'

export default (initialState) => {
	const sagaMiddleware = createSagaMiddleware()
	const enhancer = compose(applyMiddleware(sagaMiddleware), devTools())
	const store = createStore(reducer, initialState, enhancer)
	sagaMiddleware.run(sagas)
	return store
}
