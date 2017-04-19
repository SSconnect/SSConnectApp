// @flow

import Realm from 'realm';
import type { Read, TabProfile } from '../Types';

const ReadSchema = {
	name: 'Read',
	properties: {
		url: 'string',
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
	version: 3,
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
		return this.realm.objects('Reads');
	}

	addRead({ read }: { read: Read }) {
		if (realm.objects('Read').filtered('url = $0', read.url).count === 0) {
			throw new Error('Duplicate Insert');
		}
		this.realm.write(() => {
			this.realm.create('Read', read);
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

	existsTabProfile(profile: TabProfile): boolean {
		const res = this.realm
			.objects('TabProfile')
			.filtered('value = $0 AND type = $1', profile.value, profile.type);
		return res.length > 0;
	}
}

export default new RealmManager(realm);
