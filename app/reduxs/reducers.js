// @flow

import { combineReducers } from "redux"
import { profileSerialKey } from "../types/utils"
import _ from "lodash"

import { ActionTypes } from "./constants"

// The initial state of the app
const initialState = {
	loading: false,
	reads: [],
	premium: false,
	pages: {},
	profiles: [],
	config: {
		inappbrowse: false,
	},
}

function appReducers(state = initialState, action) {
	const pages = { ...state.pages }

	switch (action.type) {
		case ActionTypes.LOAD_PROFILES_END_TYPE:
			return { ...state, profiles: action.profiles }
		case ActionTypes.ADD_PROFILE_TYPE:
			return { ...state, profiles: _.concat(state.profiles, action.profile) }
		case ActionTypes.DELETE_PROFILE_TYPE:
			return {
				...state,
				profiles: _.difference(state.profiles, [action.profile]),
			}
		case ActionTypes.MOVE_PROFILE_TYPE:
			const { profiles } = state
			const { to, from } = action
			profiles.splice(to, 0, profiles.splice(from, 1)[0])
			return { ...state, profiles }

		case ActionTypes.LOAD_READS_END_TYPE:
			return { ...state, reads: action.reads }
		case ActionTypes.ADD_READ_TYPE:
			return {
				...state,
				reads: _.concat(state.reads, { story_id: action.story.id }),
			}
		case ActionTypes.LOAD_PREMIUM_END_TYPE:
			return { ...state, isPremium: action.isPremium }

		case ActionTypes.LOAD_STORIES_TYPE:
			pages[profileSerialKey(action.profile)] = { stories: [], pageInfo: null }
			return { ...state, loading: true, pages }
		case ActionTypes.LOAD_STORIES_END_TYPE:
			pages[profileSerialKey(action.profile)].stories[action.pageInfo.page] =
        action.stories
			pages[profileSerialKey(action.profile)].pageInfo = action.pageInfo
			return { ...state, loading: false, pages }
		case ActionTypes.UPDATE_PAGE_TYPE:
			pages[profileSerialKey(action.profile)].pageInfo = action.pageInfo
			return { ...state, pages }
		case ActionTypes.LOAD_CONFIG_END_TYPE:
			return { ...state, config: action.config }
		case ActionTypes.TOGGLE_IAB_CONFIG_TYPE:
			return { ...state, config: { inappbrowse: !state.config.inappbrowse } }
		default:
			return state
	}
}

export default combineReducers({
	app: appReducers,
})
