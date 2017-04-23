import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import type { Profile, Read } from '../types/index';

const selectGlobal = state => fromJS(state).get('app');

const makeSelectLoading = () => createSelector(selectGlobal, state => state.get('loading'));

const makeSelectError = () => createSelector(selectGlobal, state => state.get('error'));

const makeSelectProfiles = (): array<Profile> =>
	createSelector(selectGlobal, state => state.get('profiles'));

const makeExistsProfiles = (profile: Profile): boolean =>
	createSelector(selectGlobal, state => state.get('profiles').includes(profile));

const makeSelectProfilesCount = (): array<Read> =>
	createSelector(selectGlobal, state => state.get('profiles').length);

const makeSelectReads = (): array<Read> =>
	createSelector(selectGlobal, state => state.get('reads'));

export {
	selectGlobal,
	makeSelectLoading,
	makeSelectError,
	makeSelectProfiles,
	makeSelectProfilesCount,
	makeSelectReads,
	makeExistsProfiles,
};
