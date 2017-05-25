// @flow
import { createSelector } from "reselect"
import { profileSerialKey } from "../types/utils"

const selectGlobal = (state: Object) => state.app

const inProfiles = state => selectGlobal(state).profiles
const inReads = state => selectGlobal(state).reads
const inPages = state => selectGlobal(state).pages

const inProfilePage = (state, props) =>
  inPages(state)[profileSerialKey(props.profile)]
const inStories = (state, props) => {
	const pageStore = inProfilePage(state, props)
	if (!pageStore) {
		return []
	}
	const pageInfo = pageStore.pageInfo
	if (!pageInfo) {
		return []
	}
	return pageStore.stories[pageInfo.page] || []
}

const inPageInfo = (state, props) => {
	const pageStore = inProfilePage(state, props)
	if (!pageStore) {
		return false
	}
	return pageStore.pageInfo || { page: 1 }
}

const selectConfig = createSelector(selectGlobal, state => state.config)
const selectPremium = createSelector(selectGlobal, state => state.premium)
const selectLoading = createSelector(selectGlobal, state => state.loading)
const selectProfiles = createSelector(inProfiles, state => state)
const existsProfiles = createSelector(inProfiles, state => state.includes(""))
const selectReads = createSelector(inReads, state => state)

const makeSelectPageInfo = () => createSelector([inPageInfo], state => state)
const makeSelectStories = () => createSelector([inStories], state => state)

export {
  selectGlobal,
  selectConfig,
  selectPremium,
  selectLoading,
  selectProfiles,
  selectReads,
  existsProfiles,
  makeSelectStories,
  makeSelectPageInfo,
}
