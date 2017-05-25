// @flow

import { combineReducers } from 'redux'
import { profileSerialKey } from '../types/utils'
import { fromJS } from 'immutable'

import { ActionTypes } from './constants'

// The initial state of the app
const initialState = fromJS({
	loading: false,
	error: false,
	reads: false,
	premium: false,
	pages: {},
})
	.set('profiles', [])
	.set('config', { inappbrowse: false })

function appReducers(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.LOAD_PROFILES_TYPE:
			return state.set('error', false).set('profiles', [])
		case ActionTypes.LOAD_PROFILES_END_TYPE:
			return state.set('profiles', action.profiles)
		case ActionTypes.ADD_PROFILE_TYPE:
			return state.set('error', false)
		case ActionTypes.ADD_PROFILE_END_TYPE:
			return state.set('profiles', action.profiles)
		case ActionTypes.DELETE_PROFILE_TYPE:
			return state.set('error', false)
		case ActionTypes.DELETE_PROFILE_END_TYPE:
			return state.set('profiles', action.profiles)
		case ActionTypes.MOVE_PROFILE_TYPE:
			return state.set('error', false)
		case ActionTypes.MOVE_PROFILE_END_TYPE:
			return state.set('profiles', action.profiles)

		case ActionTypes.LOAD_READS_TYPE:
			return state.set('error', false).set('reads', false)
		case ActionTypes.LOAD_READS_END_TYPE:
			return state.set('reads', action.reads)
		case ActionTypes.ADD_READ_TYPE:
			return state.set('error', false)
		case ActionTypes.ADD_READ_END_TYPE:
			return state.set('reads', action.reads)

		case ActionTypes.LOAD_PREMIUM_TYPE:
			return state.set('premium', false)
		case ActionTypes.LOAD_PREMIUM_END_TYPE:
			return state.set('premium', action.isPremium)

		case ActionTypes.LOAD_STORIES_TYPE:
			return state
				.set('loading', true)
				.set('error', false)
				.setIn(['pages', profileSerialKey(action.profile), 'stories', action.page], false)
		case ActionTypes.LOAD_STORIES_END_TYPE:
			return state
				.set('loading', false)
				.setIn(
					['pages', profileSerialKey(action.profile), 'stories', action.pageInfo.page],
					action.stories
				)
				.setIn(['pages', profileSerialKey(action.profile), 'pageInfo'], action.pageInfo)
		case ActionTypes.UPDATE_PAGE_TYPE:
			return state.setIn(['pages', profileSerialKey(action.profile), 'pageInfo'], {
				page: action.page,
			})
		case ActionTypes.LOAD_CONFIG_END_TYPE:
			return state.set('config', action.config)
		case ActionTypes.TOGGLE_IAB_CONFIG_TYPE:
			return state.set('config', { inappbrowse: !state.get('config').inappbrowse })

		default:
			return state
	}
}

export default combineReducers({
	app: appReducers,
})
