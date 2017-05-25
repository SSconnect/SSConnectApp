import { fork, put, takeLatest } from 'redux-saga/effects'
import { Platform } from 'react-native'
import InAppBilling from 'react-native-billing'

import config from '../configs'
import feedClient from '../services/FeedClient'

import { ActionTypes } from './constants'

import {
	loadProfilesEnd,
	addProfileEnd,
	deleteProfileEnd,
	moveProfileEnd,
	loadReadsEnd,
	addReadEnd,
	loadStoriesEnd,
	loadPremiumEnd,
	loadConfigEnd,
} from './actions'

import realm from '../models/RealmModel'
import type { Profile } from '../types/index'

export function* addProfile(profile: Profile) {
	const profiles = yield realm.addProfile(profile)
	yield put(addProfileEnd(profiles))
}
export function* getProfiles() {
	const profiles = yield realm.getProfiles()
	yield put(loadProfilesEnd(profiles))
}

export function* moveProfile({ from, to }: { from: number, to: number }) {
	const profiles = yield realm.moveProfile(from, to)
	yield put(moveProfileEnd(profiles))
}

export function* deleteProfile(profile: Profile) {
	const profiles = yield realm.deleteProfile(profile)
	yield put(deleteProfileEnd(profiles))
}

export function* addRead(story: Stroy) {
	realm.addRead(story)
	yield put(addReadEnd(realm.getReads()))
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

export function* getPremium() {
	if (Platform.OS === 'ios') {
		yield put(loadPremiumEnd(true))
		return
	}
	// android
	yield InAppBilling.close()
	yield InAppBilling.open()

	const isPurchased = yield InAppBilling.isPurchased(config.productID)
	yield put(loadPremiumEnd(isPurchased))
	yield InAppBilling.close()
}

export function* getStories({ profile, page }: { profile: Profile }) {
	const { stories, pageInfo } = yield feedClient.getStories({ page, ...profile })
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
	yield takeLatest(ActionTypes.LOAD_PREMIUM_TYPE, getPremium)

	yield takeLatest(ActionTypes.LOAD_CONFIG_TYPE, getConfig)
	yield takeLatest(ActionTypes.TOGGLE_IAB_CONFIG_TYPE, toggleConfigIAB)
}

export default function* root() {
	yield [fork(appData)]
}
