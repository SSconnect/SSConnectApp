// @flow

import Realm from 'realm';
import _ from 'lodash';

import type { Story, TabProfile } from '../Types';

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

const realm = new Realm({
	schema: [ReadSchema, TabProfileSchema],
	version: 6,
	migration: (oldRealm, newRealm) => {
		newRealm.deleteAll();
	},
});

class RealmManager {
	realm: Realm;

	constructor(realm: Realm) {
		this.realm = realm;
	}

	getTabProfiles() {
		return this.realm.objects('TabProfile');
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

	addTabProfile({ profile }: { profile: TabProfile }) {
		if (this.existsTabProfile(profile)) {
			throw new Error('Duplicate Insert');
		}
		this.realm.write(() => {
			this.realm.create('TabProfile', profile);
		});
		return this.getTabProfiles();
	}

	deleteTabProfile({ profile }: { profile: TabProfile }) {
		const res = this.selectTabProfile(profile);
		this.realm.write(() => {
			this.realm.delete(res);
		});
		return this.getTabProfiles();
	}

	selectTabProfile({ profile }: { profile: TabProfile }) {
		return this.realm
			.objects('TabProfile')
			.filtered('value = $0 AND type = $1', profile.value, profile.type);
	}

	moveTabProfile(from: number, to: number) {
		const profiles = [];
		const oldProfiles = this.getTabProfiles();
		_.each(oldProfiles, v => profiles.push({ ...v }));
		profiles.splice(to, 0, profiles.splice(from, 1)[0]);
		this.realm.write(() => {
			this.realm.delete(oldProfiles);
			_.each(profiles, v => this.realm.create('TabProfile', v));
		});
		return profiles;
	}

	existsTabProfile(profile: TabProfile): boolean {
		return this.selectTabProfile(profile).length > 0;
	}
}

export default new RealmManager(realm);
