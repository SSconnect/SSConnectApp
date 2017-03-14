// @flow

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import _ from 'lodash';

import HomeScreen from '../Home';
import TagScreen from '../Tag';
import {Scene, Router} from 'react-native-router-flux';

import TabIcon from '../../Components/TabIcon';

import {Colors} from '../../Themes';

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white
	},
	main: {
		marginTop: 300
	},
	navBar: {
		backgroundColor: Colors.white
	},
	tabBarStyle: {
		backgroundColor: Colors.white
	}
});

class App extends Component {
	render() {
		const text = 1;
		const columns = [
			{
				q: 'モバP',
				type: 'search'
			},
			{
				q: '幼馴染',
				type: 'loyalty'
			},
			{
				q: '杏',
				type: 'loyalty'
			},
			{
				q: 'ヴィーネ',
				type: 'search'
			}
		];
		const scenes = [];
		_.chunk(columns, 3)[0].forEach((c, i) => {
			scenes.push((
				<Scene
					key={`tab${i}`}
					titleStyle={Styles.title}
					component={HomeScreen}
					title={`@${c.q}`}
					tabTitle={`@${c.q}`}
					iconName={c.type}
					q={c.q}
					icon={TabIcon}
					passProps
					/>
			));
		});
		return (
			<Router style={Styles.container}>
				<Scene key="root">
					<Scene initial key="tabbar" tabs tabBarStyle={Styles.tabBarStyle}>
						<Scene
							initial key="homeScreen"
							titleStyle={Styles.title}
							component={HomeScreen}
							title="ホーム"
							tabTitle="Home"
							iconName="home"
							icon={TabIcon}
							/>
						<Scene
							key="tagsScreen"
							titleStyle={Styles.title}
							component={TagScreen}
							title="タグリスト"
							tabTitle="Tags"
							iconName="local-offer"
							icon={TabIcon}
							/>
						{scenes}
					</Scene>
				</Scene>
			</Router>
		);
	}
}

export default App;
