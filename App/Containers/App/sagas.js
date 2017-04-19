import { fork, put, takeLatest } from 'redux-saga/effects';

import { LOAD_PROFILES } from './constants';
import { loadProfilesEnd } from './actions';
import { makeSelectTabProfiles } from './selectors';
import type { TabProfile } from '../../../Types';
import realm from '../../Models/RealmModel';

export function* getTabProfiles() {
	const profiles: array<TabProfile> = yield realm.getTabProfiles();
	yield put(loadProfilesEnd(profiles));
}

export function* appData() {
	yield takeLatest(LOAD_PROFILES, getTabProfiles);

	// yield take(LOCATION_CHNGES)
}

export default function* root() {
	yield [fork(appData)];
}
