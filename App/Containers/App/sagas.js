import { fork, put, takeLatest } from 'redux-saga/effects';

import { LOAD_PROFILES } from './constants';
import { loadProfilesEnd } from './actions';
import type { TabProfile } from '../../../Types';

export function* getTabProfiles() {
	const profiles: array<TabProfile> = [{ value: 'P', type: 'search' }];
	yield put(loadProfilesEnd(profiles));
}

export function* appData() {
	yield takeLatest(LOAD_PROFILES, getTabProfiles);

	// yield take(LOCATION_CHNGES)
}

export default function* root() {
	yield [fork(appData)];
}
