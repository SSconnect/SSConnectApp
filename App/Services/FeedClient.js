/* @flow */

import {create} from 'apisauce';
import moment from 'moment';

import res1 from '../../sample/v1/articles';

export type Article = {
  id: number,
  posted_at: number,
  title: string,
  url: string,
  blog: Blog
}

export type Blog = {
  id: number,
  title: string,
  url: string,
  rss: string
}

class FeedClient {
	api: any
	host = 'https://ssconnect.elzup.com'

	constructor() {
		console.log('Gen AnncitAPI');
		this.api = create({
			baseURL: this.host,
			timeout: 10000
		});
	}

	async getArticles(page?: number): Promise<Array<Article>> {
		const params = {
			page: page || 1
		};
		const res = this.api.get('/v1/artciles', params);

		console.log(res);
		if (res.ok) {
			return res.data;
		}
		console.log(res1);
		return res1;
	}
}

export default new FeedClient();
