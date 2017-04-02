// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import _ from 'lodash';

import BaseScreen from '../Base';
import TagScreen from '../Tag';

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
	const columns = [
		{
			q: 'モバP',
			isTag: false,
		},
		{
			q: '幼馴染',
			isTag: true,
		},
		{
			q: '杏',
			isTag: true,
		},
		{
			q: 'ヴィーネ',
			isTag: true,
		},
	];

	const tabAttrs = {
		titleStyle: Styles.title,
		icon: TabIcon,
		passProps: true,
		renderRightButton: () => (<Icon name="settings" onPress={Actions.homeScreen} />),
		onRight: () => alert('Right button!'),
	};
	const scenes = [];
	_.chunk(columns, 3)[0].forEach((c, i) => {
		scenes.push((
  <Scene
    key={`tab${c.q}`}
    component={BaseScreen}
    title={`@${c.q}`}
    tabTitle={`@${c.q}`}
    iconName={c.isTag ? IconName.favTag : IconName.search}
    {...c}
    {...tabAttrs}
  />
        ));
	});
	return (
  <Router style={Styles.container}>
    <Scene key="root">
      <Scene initial key="tabbar" tabs tabBarStyle={Styles.tabBarStyle}>
        <Scene
          initial key="homeScreen"
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
      <Scene
        key="baseScreen"
        component={BaseScreen}
        title="結果"
        titleStyle={Styles.title}
      />

    </Scene>
  </Router>
	);
};

export default App;
