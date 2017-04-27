import { createSelector } from 'reselect';
import { fromJS, Map, List } from 'immutable';
import { profileSerialKey } from '../types/utils';

const selectGlobal = (state: Object) => fromJS(state).get('app');

const inProfiles = state => selectGlobal(state).get('profiles');
const inReads = state => selectGlobal(state).get('reads');

const inPages = state => selectGlobal(state).get('pages');
const inProfilePage = (state, props) =>
	inPages(state).get(profileSerialKey(props.profile)) || Map();
const inStories = (state, props) => {
	const page = props.pageInfo ? props.pageInfo.page : 1;
	return inProfilePage(state, props).getIn(['stories', page]) || false;
};

const inPageInfo = (state, props) => inProfilePage(state, props).get('pageInfo');

const selectLoading = createSelector(selectGlobal, state => state.get('loading'));
const selectError = createSelector(selectGlobal, state => state.get('error'));
const selectProfiles = createSelector(inProfiles, state => state);
const existsProfiles = createSelector(inProfiles, state => state.includes(''));
const selectProfilesCount = createSelector(inProfiles, state => state.size);
const selectReads = createSelector(inReads, state => state);

const makeSelectPageInfo = () => createSelector([inPageInfo], state => state || { page: 1 });
const makeSelectStories = () => createSelector([inStories], state => state || []);

export {
	selectGlobal,
	selectLoading,
	selectError,
	selectProfiles,
	selectProfilesCount,
	selectReads,
	existsProfiles,
	makeSelectStories,
	makeSelectPageInfo,
};
