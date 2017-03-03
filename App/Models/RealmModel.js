/* @flow */

import Realm from 'realm';

const ReadSchema = {
	name: 'Read',
	properties: {
		url: 'string'
	}
};

export default new Realm({
	schema: [ReadSchema]
});
