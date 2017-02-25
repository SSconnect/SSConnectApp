/* @flow */

import {DOMParser} from 'xmldom';

export type Feed = {
  blogname: string,
  title: string,
  link: string,
  read: boolean,
  description: string
}

class FeedClient {
	constructor() {
	}

	async fetchFeed() {
		const parser = new DOMParser();
		const res = await fetch('http://ssmatomesokuho.com/feed.xml');
		const doc = parser.parseFromString(res.text(), 'application/xml');
		const items = doc.documentElement.getElementsByTagName('item');
		const feeds = items.map(item => {
			return {
				blogname: this.elementValue(item, 'dc:creator'),
				title: this.elementValue(item, 'title'),
				link: this.elementValue(item, 'link'),
				read: false,
				description: this.elementValue(item, 'description')
			};
		});
		return feeds;
	}

	elementValue(e: Object, tagName: string) {
		return e.getElementsByTagName(tagName)[0].childNodes[0].data;
	}
}

export default new FeedClient();
