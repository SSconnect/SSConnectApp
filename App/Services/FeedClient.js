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

	fetchFeed() {
		const parser = new DOMParser();
		return fetch('http://ssmatomesokuho.com/feed.xml')
    .then(res => res.text())
    .then(text => parser.parseFromString(text, 'application/xml'))
    .then(doc => doc.documentElement.getElementsByTagName('item'))
    .then(items => {
	const feeds: Array<Feed> = [];
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		feeds.push({
			blogname: this.elementValue(item, 'dc:creator'),
			title: this.elementValue(item, 'title'),
			link: this.elementValue(item, 'link'),
			read: false,
			description: this.elementValue(item, 'description')
		});
	}
	return feeds;
},
    );
	}
	elementValue(e: Object, tagName: string) {
		return e.getElementsByTagName(tagName)[0].childNodes[0].data;
	}
}

export default new FeedClient();
