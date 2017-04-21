import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

import {
	LOAD_PROFILES,
	LOAD_PROFILES_END,
	ADD_PROFILE,
	ADD_PROFILE_END,
	DELETE_PROFILE,
	DELETE_PROFILE_END,
	MOVE_PROFILE,
	MOVE_PROFILE_END,
	LOAD_READS,
	LOAD_READS_END,
	ADD_READ,
	ADD_READ_END,
} from './constants';

// The initial state of the app
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
			return state.set('loading', true).set('error', false);
		case ADD_PROFILE_END:
			return state.set('profiles', action.profiles).set('loading', false);
		case DELETE_PROFILE:
			return state.set('loading', true).set('error', false);
		case DELETE_PROFILE_END:
			return state.set('profiles', action.profiles).set('loading', false);
		case MOVE_PROFILE:
			return state.set('loading', true).set('error', false);
		case MOVE_PROFILE_END:
			return state.set('profiles', action.profiles).set('loading', false);

		case LOAD_READS:
			return state.set('loading', true).set('error', false).set('reads', false);
		case LOAD_READS_END:
			return state.set('reads', action.reads).set('loading', false);
		case ADD_READ:
			return state.set('loading', true).set('error', false);
		case ADD_READ_END:
			return state.set('reads', action.reads).set('loading', false);
		default:
			return state;
	}
}

export default combineReducers({
	app: appReducers,
});
