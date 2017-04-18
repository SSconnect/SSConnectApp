// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import _ from 'lodash';

import BaseScreen from '../Base';
import TagScreen from '../Tag';
import NavigationDrawer from '../NavigationDrawer';
import TabIcon from '../../Components/TabIcon';

import { Colors, IconName } from '../../Themes';
import realm from '../../Models/RealmModel';

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	main: {
		marginTop: 300,
	},
	navBar: {
		backgroundColor: Colors.white,
	},
	tabBarStyle: {
		backgroundColor: Colors.white,
	},
});

const App = () => {
	const tabProfiles = realm.getTabProfiles();

	const tabAttrs = {
		titleStyle: Styles.title,
		icon: TabIcon,
		passProps: true,
	};
	const scenes = [];
	_.chunk(tabProfiles, 3)[0].forEach((profile) => {
		scenes.push(
			<Scene
				key={`tab${profile.value}`}
				component={BaseScreen}
				title={`@${profile.value}`}
				tabTitle={`@${profile.value}`}
				iconName={profile.type === 'tag' ? IconName.favTag : IconName.search}
				profile={profile}
				{...tabAttrs}
			/>,
		);
	});
	return (
		<Router>
			<Scene key="drawer" component={NavigationDrawer} open={false}>
				<Scene key="root" style={Styles.container}>
					<Scene initial key="tabbar" tabs tabBarStyle={Styles.tabBarStyle}>
						<Scene
							initial
							key="homeScreen"
							component={BaseScreen}
							title="ホーム"
							tabTitle="Home"
							isHome
							iconName={IconName.home}
							{...tabAttrs}
						/>
						<Scene
							key="tagsScreen"
							component={TagScreen}
							title="タグリスト"
							tabTitle="Tags"
							iconName={IconName.tag}
							{...tabAttrs}
						/>
						{scenes}
					</Scene>
					<Scene key="baseScreen" component={BaseScreen} title="結果" titleStyle={Styles.title} />
				</Scene>
			</Scene>
		</Router>
	);
};

export default App;
