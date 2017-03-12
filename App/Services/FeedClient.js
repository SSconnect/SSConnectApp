// @flow

import {create} from 'apisauce';
import moment from 'moment';
import type {Article, Story, Blog} from '../Types';

type Params = {
  page?: number,
  blog_id?: number,
  q?: string
}

class FeedClient {
	api: any
	// host = 'https://ssconnect.elzup.com'
	host = __DEV__ ? 'http://localhost:3000' : 'https://ssconnect.elzup.com'

	constructor() {
		console.log('Gen AnncitAPI');
		this.api = create({
			baseURL: this.host,
			timeout: 10000
		});
	}

	async getStories(params: ?Params): Promise<Array<Story>> {
		const defaultProps: Params = {page: 1, q: ''};
		const reqParams: Params = params ? {...defaultProps, ...params} : defaultProps;
		console.log(reqParams);
		const res = await this.api.get('/v1/stories', reqParams);
		console.log('res', res);
		if (!res.ok) {
			throw new Error('can\'t request');
		}
		return res.data;
	}

	async getBlogs(): Promise<Array<Blog>> {
		const res = await this.api.get('/v1/blogs');
		console.log('res', res);

		if (!res.ok) {
			throw new Error('Response error');
		}
		return res.data;
	}
}

export default new FeedClient();
