// @flow

// HACK:
import type { Profile } from '.';

export function profileSerialKey(profile: Profile): string {
	return [profile.blog_id || '', profile.tag || '', profile.q || ''].join('___');
}
