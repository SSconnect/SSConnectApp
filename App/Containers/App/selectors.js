import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import type { TabProfile, Read } from '../../Types';

const selectGlobal = state => fromJS(state).get('app');

const makeSelectLoading = () => createSelector(selectGlobal, state => state.get('loading'));

const makeSelectError = () => createSelector(selectGlobal, state => state.get('error'));

const makeSelectTabProfiles = (): array<TabProfile> =>
	createSelector(selectGlobal, state => state.get('profiles'));

const makeExistsTabProfiles = (profile: TabProfile): boolean =>
	createSelector(selectGlobal, state => state.get('profiles').includes(profile));

const makeSelectTabProfilesCount = (): array<Read> =>
	createSelector(selectGlobal, state => state.get('profiles').length);

const makeSelectReads = (): array<Read> =>
	createSelector(selectGlobal, state => state.get('reads'));

export {
	selectGlobal,
	makeSelectLoading,
	makeSelectError,
	makeSelectTabProfiles,
	makeSelectTabProfilesCount,
	makeSelectReads,
	makeExistsTabProfiles,
};
