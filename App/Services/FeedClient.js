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
	host = __DEV__ ? 'http://localhost:3000' : 'https://ssconnect.elzup.com'

	constructor() {
		console.log('Gen AnncitAPI');
		this.api = create({
			baseURL: this.host,
			timeout: 10000
		});
	}

	async getArticles(page = 1, blog_id = null): Promise<Array<Article>> {
		const params = {page};
		if (blog_id) {
			params.blog_id = blog_id;
		}
		const res = await this.api.get('/v1/articles', params);

		console.log('res', res);
		if (res.ok) {
			return res.data;
		}
		return res1;
	}

	async getBlogs(): Promise<Array<Blog>> {
		const res = await this.api.get('/v1/blogs');

		console.log('res', res);
		if (res.ok) {
			return res.data;
		}
		return res1;
	}
}

export default new FeedClient();
