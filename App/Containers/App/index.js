// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RootContainer from '../Root';
import reducers from '../reducers';

// create our store
const store = createStore(reducers);

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
