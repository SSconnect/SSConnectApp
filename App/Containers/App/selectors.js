import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectLoading = () =>
	createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () => createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectTabProfiles = () =>
	createSelector(selectGlobal, globalState => globalState.get('tabProfiles'));

export { selectGlobal, makeSelectLoading, makeSelectError, makeSelectTabProfiles };
