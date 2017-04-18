import { fromJS } from 'immutable';

import { LOAD_PROFILES, LOAD_PROFILES_END } from './constants';

// The initial state of the App
const initialState = fromJS({
	loading: false,
	error: false,
	reads: false,
	tabProfiles: false,
});

function appReducers(state = initialState, action) {
	switch (action.type) {
		case LOAD_PROFILES:
			return state.set('loading', true).set('error', false).set('tabProfiles', false);
		case LOAD_PROFILES_END:
			return state.set('tabProfiles', action.profiles).set('loading', false);
		default:
			return state;
	}
}

export default appReducers;
