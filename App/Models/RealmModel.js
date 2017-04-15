// @flow

import Realm from 'realm';

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

export default new Realm({
	schema: [ReadSchema, TabProfileSchema],
	version: 3,
});
