// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import _ from 'lodash';

import BaseScreen from '../containers/Base';
import MainScreen from '../containers/Main';
import WebScreen from '../containers/Web';
import TagScreen from '../containers/Tag';
import NavigationDrawer from '../containers/NavigationDrawer';

import { Colors, IconName } from '../themes';

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

class NavigationRouter extends React.PureComponent {
	render() {
		const tabAttrs = {
			titleStyle: Styles.title,
			passProps: true,
		};
		return (
			<Router>
				<Scene key="drawer" component={NavigationDrawer} open={false}>
					<Scene key="root" style={Styles.container}>
						<Scene
							initial
							key="MainScreen"
							component={MainScreen}
							title="ホーム"
							tabTitle="main"
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
						<Scene key="baseScreen" component={BaseScreen} title="結果" titleStyle={Styles.title} />
						<Scene key="webScreen" component={WebScreen} {...tabAttrs} />
					</Scene>
				</Scene>
			</Router>
		);
	}
}

export default NavigationRouter;
