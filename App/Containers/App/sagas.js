import { fork, put, takeLatest } from 'redux-saga/effects';

import { LOAD_PROFILES } from './constants';
import { loadProfilesEnd } from './actions';

export async function getTabProfiles() {
	const profiles = [];
	await put(loadProfilesEnd(profiles));
}

export async function appData() {
	await takeLatest(LOAD_PROFILES, getTabProfiles);

	// yield take(LOCATION_CHNGES)
}

export default function* root() {
	yield [fork(appData)];
}
