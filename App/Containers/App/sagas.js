import { fork, put, takeLatest } from 'redux-saga/effects';

import { LOAD_PROFILES, ADD_PROFILE, MOVE_PROFILE, LOAD_READS, ADD_READ } from './constants';

import {
	loadProfilesEnd,
	addProfileEnd,
	moveProfileEnd,
	loadReadsEnd,
	addReadEnd,
} from './actions';
import type { TabProfile, Read } from '../../Types';
import realm from '../../Models/RealmModel';

export function* addTabProfile(profile: TabProfile) {
	const profiles = realm.addTabProfile(profile);
	yield put(addProfileEnd(profiles));
}

export function* getTabProfiles() {
	const profiles = realm.getTabProfiles();
	yield put(loadProfilesEnd(profiles));
}

export function* moveTabProfile({ from, to }: { from: number, to: number }) {
	const profiles = realm.moveTabProfile(from, to);
	yield put(moveProfileEnd(profiles));
}

export function* addRead(read: Read) {
	realm.addRead(read);
	yield put(addReadEnd(realm.getReads()));
}

export function* getReads() {
	const reads = realm.getReads();
	yield put(loadReadsEnd(reads));
}

export function* appData() {
	yield takeLatest(LOAD_PROFILES, getTabProfiles);
	yield takeLatest(ADD_PROFILE, addTabProfile);
	yield takeLatest(MOVE_PROFILE, moveTabProfile);

	yield takeLatest(LOAD_READS, getReads);
	yield takeLatest(ADD_READ, addRead);
}

export default function* root() {
	yield [fork(appData)];
}
