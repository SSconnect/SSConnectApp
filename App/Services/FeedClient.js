// @flow

import {create} from 'apisauce';
import moment from 'moment';
import {Article, Blog} from '../Types';

type Props = {
  page?: number,
  blog_id?: number,
  q?: string
}

class FeedClient {
	host = 'https://ssconnect.elzup.com'
	// host = __DEV__ ? 'http://localhost:3000' : 'https://ssconnect.elzup.com'

	constructor() {
		console.log('Gen AnncitAPI');
		this.api = create({
			baseURL: this.host,
			timeout: 10000
		});
	}

	async getArticles(props: Props): Promise<Array<Article>> {
		const defaultProps: Props = {page: 1, q: ''};
		const res = await this.api.get('/v1/articles', {...defaultProps, ...props});

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
