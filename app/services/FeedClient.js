// @flow

import { create } from 'apisauce';
import type { Story, Blog, Tag, PageInfo } from '../types';

type Params = {
	page?: number,
	tag?: string,
	blog_id?: number,
	q?: string,
};

class FeedClient {
	api: any;
	host = __DEV__ ? 'http://localhost:3000' : 'https://ssconnect.elzup.com';
	host = 'https://ssconnect.elzup.com';

	constructor() {
		this.api = create({
			baseURL: this.host,
			timeout: 10000,
		});
	}

	async getStories(params: ?Params): Promise<{ stories: Array<Story>, pageInfo: PageInfo }> {
		const defaultParams = { page: 1 };
		const res = await this.api.get('/v1/stories', { ...defaultParams, ...params });
		console.log('res', res);
		if (!res.ok) {
			throw new Error("can't request");
		}
		return { stories: res.data, pageInfo: { current: 10, max: 20, next: 11, prev: 9 } };
	}

	async getBlogs(): Promise<Array<Blog>> {
		const res = await this.api.get('/v1/blogs');
		console.log('res', res);

		if (!res.ok) {
			throw new Error('Response error');
		}
		return res.data;
	}

	async getTags(): Promise<Array<Tag>> {
		const res = await this.api.get('/v1/tags');
		console.log('res', res);

		if (!res.ok) {
			throw new Error('Response error');
		}
		return res.data;
	}
}

export default new FeedClient();
