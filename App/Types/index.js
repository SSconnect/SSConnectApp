// @flow

export type Article = {
  id: number,
  posted_at: number,
  title: string,
  url: string,
  category_list: Array<string>,
  blog: Blog
}

export type Blog = {
  id: number,
  title: string,
  url: string,
  rss: string
}
