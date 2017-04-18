// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RootContainer from '../Root';

// create our store
const store = createStore();

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
