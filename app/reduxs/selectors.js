import { createSelector } from 'reselect';
import { fromJS, Map } from 'immutable';
import { profileSerialKey } from '../types/utils';

const selectGlobal = (state: Object) => fromJS(state).get('app');

const inProfiles = state => selectGlobal(state).get('profiles');
const inReads = state => selectGlobal(state).get('reads');

const inPages = state => selectGlobal(state).get('pages');
const inProfilePage = (state, props) =>
	inPages(state).get(profileSerialKey(props.profile)) || Map();
const inStories = (state, props) => {
	const pageStore = inProfilePage(state, props);
	const pageInfo = pageStore.get('pageInfo');
	if (!pageInfo) {
		return false;
	}
	return pageStore.getIn(['stories', pageInfo.page]);
};

const inPageInfo = (state, props) => inProfilePage(state, props).get('pageInfo');

const selectPremium = createSelector(selectGlobal, state => state.get('premium'));
const selectLoading = createSelector(selectGlobal, state => state.get('loading'));
const selectError = createSelector(selectGlobal, state => state.get('error'));
const selectProfiles = createSelector(inProfiles, state => (state.length > 0 ? state : []));
const existsProfiles = createSelector(inProfiles, state => state.includes(''));
const selectReads = createSelector(inReads, state => state);

const makeSelectPageInfo = () => createSelector([inPageInfo], state => state || { page: 1 });
const makeSelectStories = () => createSelector([inStories], state => state || []);

export {
	selectGlobal,
	selectPremium,
	selectLoading,
	selectError,
	selectProfiles,
	selectReads,
	existsProfiles,
	makeSelectStories,
	makeSelectPageInfo,
};
