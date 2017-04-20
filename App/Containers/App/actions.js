import {
	LOAD_PROFILES,
	LOAD_PROFILES_END,
	ADD_PROFILE,
	ADD_PROFILE_END,
	LOAD_READS,
	LOAD_READS_END,
	ADD_READ,
	ADD_READ_END,
	MOVE_PROFILE,
	MOVE_PROFILE_END,
} from './constants';

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

export function addProfile(profile) {
	return {
		type: ADD_PROFILE,
		profile,
	};
}

export function addProfileEnd(profiles) {
	return {
		type: ADD_PROFILE_END,
		profiles,
	};
}

export function moveProfile(from, to) {
	return {
		type: MOVE_PROFILE,
		from,
		to,
	};
}

export function moveProfileEnd(profiles) {
	return {
		type: MOVE_PROFILE_END,
		profiles,
	};
}

export function loadReads() {
	return {
		type: LOAD_READS,
	};
}

export function loadReadsEnd(reads) {
	return {
		type: LOAD_READS_END,
		reads,
	};
}

export function addRead(read) {
	return {
		type: ADD_READ,
		read,
	};
}

export function addReadEnd(reads) {
	return {
		type: ADD_READ_END,
		reads,
	};
}
