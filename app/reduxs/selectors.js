// @flow
import { createSelector } from "reselect";
import { profileSerialKey } from "../types/utils";

import type { GlobalState, AppState, ConfigState } from "../types";
import _ from "lodash";
import { Profile } from "../types";

const selectGlobal: (state: GlobalState) => AppState = state => state.app;
const selectConfig: (state: GlobalState) => ConfigState = state => state.config;

const inProfiles = state => selectGlobal(state).profiles;
const inReads = state => selectGlobal(state).reads;
const inPages = state => selectGlobal(state).pages;

const inProfilePage = (state, props) =>
  inPages(state)[profileSerialKey(props.profile)];

const inStories = (state, props) => {
  const pageStore = inProfilePage(state, props);
  if (!pageStore) {
    return [];
  }
  const pageInfo = pageStore.pageInfo;
  if (!pageInfo) {
    return [];
  }
  return pageStore.stories[pageInfo.page] || [];
};

const inReaded = (state, props) => {
  const reads = inReads(state);
  return reads.includes(props.story.id);
};

const inPageInfo = (state, props) => {
  const pageStore = inProfilePage(state, props);
  if (!pageStore) {
    return false;
  }
  return pageStore.pageInfo || { page: 1 };
};

const selectLoading = createSelector(selectGlobal, state => state.loading);
const selectProfiles = createSelector(inProfiles, state =>
  _.map(state, p => new Profile(p))
);
const selectReads = createSelector(inReads, state => state);

const makeSelectPageInfo = () => createSelector([inPageInfo], state => state);
const makeSelectStories = () => createSelector([inStories], state => state);
const makeSelectReaded = () => createSelector([inReaded], state => state);

export {
  selectGlobal,
  selectConfig,
  selectLoading,
  selectProfiles,
  selectReads,
  makeSelectStories,
  makeSelectReaded,
  makeSelectPageInfo
};
