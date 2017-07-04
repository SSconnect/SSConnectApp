// @flow

import IconName from "../themes/IconName";
export type Blog = {
  id: number,
  title: string,
  url: string,
  rss: string
};

export type Article = {
  id: number,
  posted_at: number,
  url: string,
  blog: Blog
};

export type Story = {
  id: number,
  title: string,
  first_posted_at: string,
  tag_list: Array<string>,
  articles: Array<Article>
};

export type Tag = {
  id: number,
  name: string,
  taggings_count: number
};

export type Read = {
  story_id: number
};

export class Profile {
  blog_id: ?number;
  q: string;
  tag: string;

  constructor(obj) {
    Object.assign(this, { blog_id: null, q: "", tag: "", ...obj });
  }

  icon() {
    if (this.tag && this.q) {
      return IconName.favTag;
    } else if (this.tag) {
      return IconName.tag;
    } else if (this.q) {
      return IconName.search;
    }
    return IconName.home;
  }

  label() {
    if (this.tag && this.q) {
      return this.q;
    } else if (this.tag) {
      return this.tag;
    } else if (this.q) {
      return this.q;
    }
    return "ホーム";
  }

  eq(obj) {
    return { blog_id: null, q: "", tag: "", ...obj } === this.raw();
  }

  raw() {
    return _.pick(this, ["blog_id", "q", "tag"]);
  }
}

export type PageInfo = {
  page: number,
  total: number,
  prev: number | false,
  next: number | false
};

export type Config = {
  inappbrowse: boolean
};

/* store */
export type AppState = {|
  loading: boolean,
  reads: Array<Read>,
  pages: Object,
  profiles: Array<Profile>
|};

export type ConfigState = {|
  inappbrowse: boolean
|};

export type GlobalState = {|
  app: AppState,
  config: ConfigState
|};
