// @flow

export type Blog = {
	id: number,
	title: string,
	url: string,
	rss: string
}

export type Article = {
	id: number,
	posted_at: number,
	url: string,
	blog: Blog
}

export type Story = {
	id: number,
	title: string,
	first_posted_at: string,
	tag_list: Array<string>,
	articles: Array<Article>
}

export type Tag = {
	id: number,
	name: string,
	taggings_count: number
}

export type Read = {
	story_id: number
}

export type Profile = {
	blog_id?: number,
	q: string,
	tag: string
}

export type PageInfo = {
	page: number,
	total: number,
	prev: number | false,
	next: number | false
}

export type Config = {
	inappbrowse: boolean
}

/* store */
export type AppState = {|
	loading: boolean,
	reads: Array<Read>,
	pages: Object,
	profiles: Array<Profile>
|}

export type ConfigState = {|
	inappbrowse: boolean
|}

export type GlobalState = {|
	app: AppState,
	config: ConfigState
|}
