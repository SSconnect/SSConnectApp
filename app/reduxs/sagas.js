import { fork, put, takeLatest } from 'redux-saga/effects';
import { Platform } from 'react-native';
import InAppBilling from 'react-native-billing';

import config from '../configs';
import feedClient from '../services/FeedClient';

import {
	LOAD_PROFILES,
	ADD_PROFILE,
	DELETE_PROFILE,
	MOVE_PROFILE,
	LOAD_READS,
	ADD_READ,
	LOAD_STORIES,
	LOAD_PREMIUM,
	LOAD_CONFIG,
	TOGGLE_IAB_CONFIG,
} from './constants';

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
} from './actions';

import realm from '../models/RealmModel';
import type { Profile } from '../types/index';

export function* addProfile(profile: Profile) {
	const profiles = yield realm.addProfile(profile);
	yield put(addProfileEnd(profiles));
}
export function* getProfiles() {
	const profiles = yield realm.getProfiles();
	yield put(loadProfilesEnd(profiles));
}

export function* moveProfile({ from, to }: { from: number, to: number }) {
	const profiles = yield realm.moveProfile(from, to);
	yield put(moveProfileEnd(profiles));
}

export function* deleteProfile(profile: Profile) {
	const profiles = yield realm.deleteProfile(profile);
	yield put(deleteProfileEnd(profiles));
}

export function* addRead(story: Stroy) {
	realm.addRead(story);
	yield put(addReadEnd(realm.getReads()));
}

export function* getReads() {
	const reads = realm.getReads();
	yield put(loadReadsEnd(reads));
}

export function* getConfig() {
	yield put(loadConfigEnd(realm.selectConfig()));
}

export function* toggleConfigIAB() {
	yield realm.toggleConfigInAppBrowse();
}

export function* getPremium() {
	if (Platform.OS === 'ios') {
		yield put(loadPremiumEnd(true));
		return;
	}
	// android
	yield InAppBilling.close();
	yield InAppBilling.open();

	const isPurchased = yield InAppBilling.isPurchased(config.productID);
	yield put(loadPremiumEnd(isPurchased));
	yield InAppBilling.close();
}

export function* getStories({ profile, page }: { profile: Profile }) {
	const { stories, pageInfo } = yield feedClient.getStories({ page, ...profile });
	yield put(loadStoriesEnd(profile, pageInfo, stories));
}

export function* appData() {
	yield takeLatest(LOAD_PROFILES, getProfiles);
	yield takeLatest(ADD_PROFILE, addProfile);
	yield takeLatest(DELETE_PROFILE, deleteProfile);
	yield takeLatest(MOVE_PROFILE, moveProfile);

	yield takeLatest(LOAD_READS, getReads);
	yield takeLatest(ADD_READ, addRead);
	yield takeLatest(LOAD_STORIES, getStories);
	yield takeLatest(LOAD_PREMIUM, getPremium);

	yield takeLatest(LOAD_CONFIG, getConfig);
	yield takeLatest(TOGGLE_IAB_CONFIG, toggleConfigIAB);
}

export default function* root() {
	yield [fork(appData)];
}
