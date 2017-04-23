// @flow

export type Blog = {
	id: number,
	title: string,
	url: string,
	rss: string,
};

export type Article = {
	id: number,
	posted_at: number,
	url: string,
	blog: Blog,
};

export type Story = {
	id: number,
	title: string,
	first_posted_at: string,
	tag_list: Array<string>,
	articles: Array<Article>,
};

export type Tag = {
	id: number,
	name: string,
	count: number,
};

export type Read = {
	story_id: number,
};

export type TabProfile = {
	value: string,
	type: 'search' | 'tag',
};

export type Profile = {
	blog_id: number,
	q: string,
	tag: string,
};
