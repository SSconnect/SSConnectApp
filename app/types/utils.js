// @flow

import type { Profile } from '.';

export const a = 1;

export const profileSerialKey = (profile: Profile | {}): string => {
	if (!profile || profile === {}) {
		return 'HOME';
	}
	return [profile.blog_id || '', profile.tag || '', profile.q || ''].join('AAA'); // TODO: fix
};
