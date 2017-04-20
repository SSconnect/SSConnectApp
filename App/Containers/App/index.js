// @flow

import React from 'react';
import { Provider } from 'react-redux';

import RootContainer from '../Root';
import configureStore from '../../Store/configureStore';

import sagas from '../App/sagas';

// create our store
const store = configureStore();
store.runSaga(sagas);

class App extends React.PureComponent {
	render() {
		return (
			<Provider store={store}>
				<RootContainer />
			</Provider>
		);
	}
}

export default App;
