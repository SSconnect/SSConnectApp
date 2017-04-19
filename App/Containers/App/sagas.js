import { fork, put, takeLatest } from 'redux-saga/effects';

import { LOAD_PROFILES, ADD_PROFILE } from './constants';

import { loadProfilesEnd, addProfileEnd } from './actions';
import type { TabProfile } from '../../Types';
import realm from '../../Models/RealmModel';

export function* addTabProfile(profile: TabProfile) {
	const profiles = yield realm.addTabProfile(profile);
	yield put(addProfileEnd(profiles));
}

export function* getTabProfiles() {
	const profiles = yield realm.getTabProfiles();
	yield put(loadProfilesEnd(profiles));
}

export function* appData() {
	yield takeLatest(LOAD_PROFILES, getTabProfiles);
	yield takeLatest(ADD_PROFILE, addTabProfile);
}

export default function* root() {
	yield [fork(appData)];
}
