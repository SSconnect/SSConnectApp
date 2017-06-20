// @flow

import { profileSerialKey } from "../../types/utils"
import type { AppState } from "../../types"
import _ from "lodash"

import { ActionTypes } from "../constants"
import type { Read, PageInfo, Story } from "../../types"
import { Profile } from "../../types"

import "../../types/index"

type Action = {
	profiles: Array<Profile>,
	profile: Profile,
	from: number,
	to: number,
	type: string,
	reads: Array<Read>,
	story: Story,
	stories: Array<Story>,
	pageInfo: PageInfo
}

// The initial state of the app
const initialState = {
	loading: false,
	reads: [],
	pages: {},
	profiles: [],
}

export function appReducers(state: AppState = initialState, action: Action) {
	const pages = { ...state.pages }

	switch (action.type) {
		case ActionTypes.LOAD_PROFILES_END_TYPE:
			return { ...state, profiles: action.profiles }
		case ActionTypes.ADD_PROFILE_TYPE:
			return { ...state, profiles: _.concat(state.profiles, action.profile) }
		case ActionTypes.DELETE_PROFILE_END_TYPE:
			return { ...state, profiles: action.profiles }
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
				reads: _.concat(state.reads, action.story.id),
			}

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
		default:
			return state
	}
}
