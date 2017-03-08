/* @flow */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from '../Home';
import BlogScreen from '../Blog';
import SearchScreen from '../Search';
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
						<Scene
							key="blogScreen"
							titleStyle={Styles.title}
							component={BlogScreen}
							title="ブログ"
							tabTitle="Blog"
							iconName="web"
							icon={TabIcon}
							/>
						<Scene
							key="searchScreen"
							titleStyle={Styles.title}
							component={SearchScreen}
							title="検索"
							tabTitle="Search"
							iconName="search"
							icon={TabIcon}
							/>
					</Scene>
				</Scene>
			</Router>
		);
	}
}

export default App;
