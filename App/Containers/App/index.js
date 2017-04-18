// @flow

import React from 'react';
import { Provider } from 'react-redux';

import RootContainer from '../Root';
import configureStore from '../../Store/configureStore';

// create our store
const store = configureStore();

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
