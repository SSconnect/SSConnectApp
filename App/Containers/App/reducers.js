import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

import { LOAD_PROFILES, LOAD_PROFILES_END, ADD_PROFILE, ADD_PROFILE_END } from './constants';

// The initial state of the App
const initialState = fromJS({
	loading: false,
	error: false,
	reads: false,
	profiles: false,
});

function appReducers(state = initialState, action) {
	switch (action.type) {
		case LOAD_PROFILES:
			return state.set('loading', true).set('error', false).set('profiles', false);
		case LOAD_PROFILES_END:
			return state.set('profiles', action.profiles).set('loading', false);
		case ADD_PROFILE:
			return state.set('loading', true).set('error', false).set('profiles', false);
		case ADD_PROFILE_END:
			return state.set('profiles', action.profiles).set('loading', false);
		default:
			return state;
	}
}

export default combineReducers({
	app: appReducers,
});
