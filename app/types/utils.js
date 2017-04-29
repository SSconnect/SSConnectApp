// @flow

import type { Profile } from '.';
import { IconName } from '../themes';

export const profileSerialKey = (profile: Profile | {}): string => {
	if (!profile || profile === {}) {
		return 'HOME';
	}
	return [profile.blog_id || '', profile.tag || '', profile.q || ''].join('AAA'); // TODO: fix
};

export const profileIcon = (profile: Profile): string => {
	if (profile.tag && profile.q) {
		return IconName.favTag;
	} else if (profile.tag) {
		return IconName.tag;
	} else if (profile.q) {
		return IconName.search;
	}
	return IconName.home;
};

export const profileLabel = (profile: Profile): string => {
	if (profile.tag && profile.q) {
		return profile.q;
	} else if (profile.tag) {
		return profile.tag;
	} else if (profile.q) {
		return profile.q;
	}
	return 'ホーム';
};
