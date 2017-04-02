// @flow

import { create } from 'apisauce';
import type { Story, Blog, Tag } from '../Types';

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

	async getStories(params: ?Params): Promise<Array<Story>> {
		const defaultProps: Params = { page: 1, q: '', tag: '' };
		const reqParams: Params = params ? { ...defaultProps, ...params } : defaultProps;
		console.log(reqParams);
		const res = await this.api.get('/v1/stories', reqParams);
		console.log('res', res);
		if (!res.ok) {
			throw new Error("can't request");
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
