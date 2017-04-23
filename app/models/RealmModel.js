// @flow

import Realm from 'realm';
import _ from 'lodash';

import type { Story, Profile } from '../types';

const ReadSchema = {
	name: 'Read',
	properties: {
		story_id: 'int',
	},
};

const TabProfileSchema = {
	name: 'TabProfile',
	properties: {
		value: 'string',
		type: 'string',
	},
};

const ProfileSchema = {
	name: 'Profile',
	properties: {
		blog_id: { type: 'int', optional: true },
		q: { type: 'string', optional: true },
		tag: { type: 'string', optional: true },
	},
};

const realm = new Realm({
	schema: [ReadSchema, TabProfileSchema, ProfileSchema],
	schemaVersion: 8,
	migration: (oldRealm, newRealm) => {
		console.log(oldRealm.schemaVersion, newRealm.schemaVersion);
		if (oldRealm.schemaVersion <= 5) {
			newRealm.deleteAll();
		}
		if (oldRealm.schemaVersion <= 6) {
			const profiles = oldRealm.objects('TabProfile');
			_.each(profiles, (profile) => {
				if (profile.type === 'search') {
					newRealm.create('Profile', { q: profile.value });
				} else {
					newRealm.create('Profile', { tag: profile.value });
				}
			});
		}
		if (oldRealm.schemaVersion <= 7) {
			oldRealm.deleteAll();
			newRealm.deleteAll();
		}
	},
});

class RealmManager {
	realm: Realm;

	constructor(realmC: Realm) {
		this.realm = realmC;
	}

	getProfiles() {
		return this.realm.objects('Profile');
	}

	getReads() {
		return this.realm.objects('Read');
	}

	addRead({ story }: { story: Story }) {
		if (realm.objects('Read').filtered('story_id = $0', story.id).count === 0) {
			return;
		}
		this.realm.write(() => {
			this.realm.create('Read', { story_id: story.id });
		});
	}

	addProfile({ profile }: { profile: Profile }) {
		if (this.existsProfile(profile)) {
			throw new Error('Duplicate Insert');
		}
		this.realm.write(() => {
			this.realm.create('Profile', profile);
		});
		return this.getProfiles();
	}

	deleteProfile({ profile }: { profile: Profile }) {
		const res = this.selectProfile(profile);
		this.realm.write(() => {
			this.realm.delete(res);
		});
		return this.getProfiles();
	}

	selectProfile(profile: Profile) {
		return this.realm
			.objects('Profile')
			.filtered('q = $0 AND tag = $1 AND blog_id = $2', profile.q, profile.tag, profile.blog_id);
	}

	moveProfile(from: number, to: number) {
		const profiles = [];
		const oldProfiles = this.getProfiles();
		_.each(oldProfiles, v => profiles.push({ ...v }));
		profiles.splice(to, 0, profiles.splice(from, 1)[0]);
		this.realm.write(() => {
			this.realm.delete(oldProfiles);
			_.each(profiles, v => this.realm.create('Profile', v));
		});
		return profiles;
	}

	existsProfile(profile: Profile): boolean {
		return this.selectProfile(profile).length > 0;
	}
}

export default new RealmManager(realm);
