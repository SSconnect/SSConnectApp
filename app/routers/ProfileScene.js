// @flow

import React from 'react';
import { Scene, Actions } from 'react-native-router-flux';

import BaseScreen from '../containers/Base';
import { IconName } from '../themes';
import type { Profile } from '../types';

type Props = {
	profile: Profile,
	tabAttrs: any,
};

type ProfileType = 'search' | 'tag' | 'tagsearch' | 'blog';

class ProfileScene extends React.PureComponent {
	props: Props;

	profileType(): ProfileType {
		const { profile } = this.props;
		if (profile.blog_id) {
			return 'blog';
		}
		if (profile.tag && profile.q) {
			return 'tagsearch';
		}
		return profile.tag ? 'tag' : 'search';
	}

	render() {
		const { profile, tabAttrs } = this.props;
		if (this.profileType() === 'tag') {
			return (
				<Scene
					key={profile}
					component={BaseScreen}
					title={profile.tag}
					tabTitle={profile.tag}
					iconName={IconName.tag}
					profile={profile}
					{...tabAttrs}
				/>
			);
		}
		if (this.profileType() === 'search') {
			return (
				<Scene
					key={profile}
					component={BaseScreen}
					title={profile.q}
					tabTitle={profile.q}
					iconName={IconName.search}
					profile={profile}
					{...tabAttrs}
				/>
			);
		}
		if (this.profileType() === 'tabsearch') {
			return (
				<Scene
					key={profile}
					component={BaseScreen}
					title={`${profile.tag}: ${profile.q}`}
					tabTitle={profile.q}
					iconName={IconName.favTag}
					profile={profile}
					{...tabAttrs}
				/>
			);
		}
		return (
			<Scene
				key={profile}
				component={BaseScreen}
				title={'blog'}
				tabTitle={profile.tag + profile.q}
				iconName={IconName.threeBar}
				profile={profile}
				{...tabAttrs}
			/>
		);
	}
}

export default ProfileScene;
