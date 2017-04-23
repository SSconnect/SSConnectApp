// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import _ from 'lodash';

import BaseScreen from '../containers/Base';
import TagScreen from '../containers/Tag';
import NavigationDrawer from '../containers/NavigationDrawer';
import TabIcon from '../components/TabIcon';
import ProfileScene from './ProfileScene';

import { Colors, IconName } from '../themes';
import type { Profile } from '../types';

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

type Props = {
	profiles: Array<Profile>,
};

class NavigationRouter extends React.PureComponent {
	props: Props;

	componentWillReceiveProps() {
		this.forceUpdate();
	}

	render() {
		const tabAttrs = {
			titleStyle: Styles.title,
			icon: TabIcon,
			passProps: true,
		};
		const scenes = [];

		if (this.props.profiles !== false && this.props.profiles.length !== 0) {
			_.chunk(this.props.profiles, 3)[0].forEach((profile) => {
				scenes.push(<ProfileScene profile={profile} tabAttrs={tabAttrs} />);
			});
		}

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
	}
}

export default NavigationRouter;
