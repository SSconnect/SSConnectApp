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

	static getPageInfo(res: any): PageInfo {
		return {
			page: parseInt(res.headers['x-page'], 10),
			total: parseInt(res.headers['x-total-pages'], 10),
			next: parseInt(res.headers['x-next-page'], 10) || false,
			prev: parseInt(res.headers['x-prev-page'], 10) || false,
		};
	}

	async getStories(params: ?Params): Promise<{ stories: Array<Story>, pageInfo: PageInfo }> {
		const defaultParams = { page: 1 };
		const res = await this.api.get('/v1/stories', { ...defaultParams, ...params });
		console.log('res', res);
		if (!res.ok) {
			throw new Error("can't request");
		}
		return { stories: res.data, pageInfo: FeedClient.getPageInfo(res) };
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
