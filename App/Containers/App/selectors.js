import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import { TabProfile } from '../../Types';

const selectGlobal = state => fromJS(state).get('app');

const makeSelectLoading = () => createSelector(selectGlobal, state => state.get('loading'));

const makeSelectError = () => createSelector(selectGlobal, state => state.get('error'));

const makeSelectTabProfiles = (): array<TabProfile> =>
	createSelector(selectGlobal, state => state.get('tabProfiles'));

export { selectGlobal, makeSelectLoading, makeSelectError, makeSelectTabProfiles };
