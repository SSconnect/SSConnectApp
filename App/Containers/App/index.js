// @flow

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import HomeScreen from '../Home';
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
				q: 'モバP'
			},
			{
				q: '幼馴染'
			},
			{
				q: 'ヴィーネ'
			}
		];
		const scenes = [];
		columns.forEach((c, i) => {
			scenes.push((
				<Scene
					key={`tab${i}`}
					titleStyle={Styles.title}
					component={HomeScreen}
					title={`@${c.q}`}
					tabTitle={`@${c.q}`}
					iconName="search"
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
							title="新着"
							tabTitle="Home"
							iconName="home"
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
