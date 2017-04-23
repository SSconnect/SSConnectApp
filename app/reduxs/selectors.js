import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import type { Profile, Read } from '../types/index';

const selectGlobal = state => fromJS(state).get('app');

const profileKey = (profile: Profile) =>
	[profile.blog_id || '', profile.tag || '', profile.q || ''].join('___');

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

const makeSelectStories = (profile, page): array<Read> =>
	createSelector(selectGlobal, state => state.getIn(['stories', profileKey(profile), page]));

export {
	selectGlobal,
	makeSelectLoading,
	makeSelectError,
	makeSelectProfiles,
	makeSelectProfilesCount,
	makeSelectReads,
	makeExistsProfiles,
	makeSelectStories,
};
