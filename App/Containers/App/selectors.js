import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import { TabProfile } from '../../Types';

const selectGlobal = state => fromJS(state).get('app');

const makeSelectLoading = () => createSelector(selectGlobal, state => state.get('loading'));

const makeSelectError = () => createSelector(selectGlobal, state => state.get('error'));

const makeSelectTabProfiles = (): array<TabProfile> =>
	createSelector(selectGlobal, state => state.get('profiles'));

const makeExistsTabProfiles = (profile: TabProfile): boolean =>
	createSelector(selectGlobal, state => state.get('profiles').includes(profile));

export {
	selectGlobal,
	makeSelectLoading,
	makeSelectError,
	makeSelectTabProfiles,
	makeExistsTabProfiles,
};
