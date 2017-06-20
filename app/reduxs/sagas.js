// @flow

import { put, takeLatest } from "redux-saga/effects"
import feedClient from "../services/FeedClient"

import { ActionTypes } from "./constants"

import {
	loadConfigEnd,
	loadProfilesEnd,
	loadReadsEnd,
	loadStoriesEnd,
	deleteProfileEnd,
	moveProfileEnd,
} from "./actions"

import store from "../models/StoreManager"
import type { Profile, Story } from "../types/index"

function* addProfile({ profile }: { profile: Profile }) {
	yield store.addProfile(profile)
}
function* getProfiles() {
	const stories = yield store.getProfiles()
	yield put(loadProfilesEnd(stories))
}

function* moveProfile({ from, to }: { from: number, to: number }) {
	const profiles = yield store.moveProfile(from, to)
	yield put(moveProfileEnd(profiles))
}

function* deleteProfile({ profile }: { profile: Profile }) {
	const profiles = yield store.deleteProfile(profile)
	yield put(deleteProfileEnd(profiles))
}

function* addRead({ story }: { story: Story }) {
	yield store.addRead(story)
}

function* getReads() {
	const reads = yield store.getReads()
	yield put(loadReadsEnd(reads))
}

function* getConfig() {
	yield put(loadConfigEnd(yield store.selectConfig()))
}

function* toggleConfigIAB() {
	yield store.toggleConfigInAppBrowse()
}

function* getStories({ profile, page }: { profile: Profile, page: number }) {
	const { stories, pageInfo } = yield feedClient.getStories({
		page,
		...profile,
	})
	yield put(loadStoriesEnd(profile, pageInfo, stories))
}

function* appData() {
	yield takeLatest(ActionTypes.LOAD_PROFILES_TYPE, getProfiles)
	yield takeLatest(ActionTypes.ADD_PROFILE_TYPE, addProfile)
	yield takeLatest(ActionTypes.DELETE_PROFILE_TYPE, deleteProfile)
	yield takeLatest(ActionTypes.MOVE_PROFILE_TYPE, moveProfile)

	yield takeLatest(ActionTypes.LOAD_READS_TYPE, getReads)
	yield takeLatest(ActionTypes.ADD_READ_TYPE, addRead)
	yield takeLatest(ActionTypes.LOAD_STORIES_TYPE, getStories)

	yield takeLatest(ActionTypes.LOAD_CONFIG_TYPE, getConfig)
	yield takeLatest(ActionTypes.TOGGLE_IAB_CONFIG_TYPE, toggleConfigIAB)
}

export default appData
