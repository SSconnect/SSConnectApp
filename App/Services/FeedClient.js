/* @flow */

import {DOMParser} from 'xmldom';
import _ from 'lodash';

export type Feed = {
  blogname: string,
  title: string,
  link: string,
  read: boolean,
  description: string
}

class FeedClient {
	async fetchFeed(): Promise<Array<Feed>> {
		const parser = new DOMParser();
		const res = await fetch('http://ssmatomesokuho.com/feed.xml');
		const doc = parser.parseFromString(res.text(), 'application/xml');
		const items = doc.documentElement.getElementsByTagName('item');
		return _.map(items, this.wrapFeed);
	}

	wrapFeed(item: any): Feed {
		return {
			blogname: this.elementValue(item, 'dc:creator'),
			title: this.elementValue(item, 'title'),
			link: this.elementValue(item, 'link'),
			read: false,
			description: this.elementValue(item, 'description')
		};
	}

	elementValue(e: Object, tagName: string) {
		return e.getElementsByTagName(tagName)[0].childNodes[0].data;
	}
}

export default new FeedClient();
