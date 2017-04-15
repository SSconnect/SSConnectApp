// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import _ from 'lodash';

import BaseScreen from '../Base';
import TagScreen from '../Tag';
import NavigationDrawer from '../NavigationDrawer';

import TabIcon from '../../Components/TabIcon';

import { Colors, IconName } from '../../Themes';

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
	const Types = { search: 0, tag: 1, blog: 2 };
	const columns = [
		{
			value: 'モバP',
			type: Types.search,
		},
		{
			value: '幼馴染',
			type: Types.tag,
		},
		{
			value: '杏',
			type: Types.search,
		},
		{
			value: 'ヴィーネ',
			type: Types.tag,
		},
	];

	const tabAttrs = {
		titleStyle: Styles.title,
		icon: TabIcon,
		passProps: true,
		onRight: () => alert('Right button!'),
	};
	const scenes = [];
	_.chunk(columns, 3)[0].forEach((c) => {
		scenes.push(
  <Scene
    key={`tab${c.value}`}
    component={BaseScreen}
    title={`@${c.value}`}
    tabTitle={`@${c.value}`}
    iconName={c.type === Types.tag ? IconName.favTag : IconName.search}
    q={c.value}
    isTag={c.type === Types.tag}
    renderRightButton={() => <Icon name="add" onPress={() => {}} />}
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
