import { LOAD_PROFILES, LOAD_PROFILES_END } from './constants';

export function loadProfiles() {
	return {
		type: LOAD_PROFILES,
	};
}

export function loadProfilesEnd(profiles) {
	return {
		type: LOAD_PROFILES_END,
		profiles,
	};
}
