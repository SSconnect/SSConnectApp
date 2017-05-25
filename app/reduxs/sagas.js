// @flow

import { fork, put, takeLatest } from "redux-saga/effects"
import feedClient from "../services/FeedClient"

import { ActionTypes } from "./constants"

import { loadReadsEnd, loadStoriesEnd, loadConfigEnd } from "./actions"

import realm from "../models/RealmModel"
import type { Profile } from "../types/index"

export function* addProfile(profile: Profile) {
	yield realm.addProfile(profile)
}
export function* getProfiles() {
	yield realm.getProfiles()
}

export function* moveProfile({ from, to }: { from: number, to: number }) {
	yield realm.moveProfile(from, to)
}

export function* deleteProfile(profile: Profile) {
	yield realm.deleteProfile(profile)
}

export function* addRead(story: Stroy) {
	realm.addRead(story)
}

export function* getReads() {
	const reads = realm.getReads()
	yield put(loadReadsEnd(reads))
}

export function* getConfig() {
	yield put(loadConfigEnd(realm.selectConfig()))
}

export function* toggleConfigIAB() {
	yield realm.toggleConfigInAppBrowse()
}

export function* getStories({ profile, page }: { profile: Profile }) {
	const { stories, pageInfo } = yield feedClient.getStories({
		page,
		...profile,
	})
	yield put(loadStoriesEnd(profile, pageInfo, stories))
}

export function* appData() {
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

export default function* root() {
	yield [fork(appData)]
}
