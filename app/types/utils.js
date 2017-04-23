// @flow

// HACK:
import type { Profile } from '.';

export function profileSerialKey(profile: Profile): string {
	const key = [profile.blog_id || '', profile.tag || '', profile.q || ''].join('ABCDEFG');
	debugger;
	return key;
}
