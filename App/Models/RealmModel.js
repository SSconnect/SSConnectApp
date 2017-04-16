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

	addRead(read: Read) {
		this.realm.write(() => {
			this.realm.create('Read', read);
		});
	}

	addTabProfile(profile: TabProfile) {
		this.realm.write(() => {
			this.realm.create('TabProfile', profile);
		});
	}
}

export default new RealmManager(realm);
