import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { profileSerialKey } from '../types/utils';

import type { Profile, Read, Story } from '../types/index';

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

const makeSelectStories = (profile, page): array<Story> =>
	createSelector(selectGlobal, (state) => {
		const stories = state.getIn(['stories', profileSerialKey(profile), page]);
		return stories.length > 0 ? stories : [];
	});

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
