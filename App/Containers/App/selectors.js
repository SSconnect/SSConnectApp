import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import { TabProfile } from '../../Types';

const selectGlobal = state => fromJS(state).get('app');

const makeSelectLoading = () =>
	createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () => createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectTabProfiles = (): array<TabProfile> =>
	createSelector(selectGlobal, globalState => globalState.get('tabProfiles'));

export { selectGlobal, makeSelectLoading, makeSelectError, makeSelectTabProfiles };
