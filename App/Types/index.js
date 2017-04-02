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
  last_posted_at: string,
  tag_list: Array<string>,
  articles: Array<Article>,
};

export type Tag = {
  id: number,
  name: string,
  count: number,
};
