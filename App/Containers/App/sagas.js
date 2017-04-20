import { fork, put, takeLatest } from 'redux-saga/effects';

import { LOAD_PROFILES, ADD_PROFILE, MOVE_PROFILE } from './constants';

import { loadProfilesEnd, addProfileEnd, moveProfileEnd } from './actions';
import type { TabProfile } from '../../Types';
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

export function* appData() {
	yield takeLatest(LOAD_PROFILES, getTabProfiles);
	yield takeLatest(ADD_PROFILE, addTabProfile);
	yield takeLatest(MOVE_PROFILE, moveTabProfile);
}

export default function* root() {
	yield [fork(appData)];
}
