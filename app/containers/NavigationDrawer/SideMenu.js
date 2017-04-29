import React from 'react';
import { View, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import TabList from './TabList';

import { Scales, IconName } from '../../themes';

type Props = {};

type State = {};

class SideMenu extends React.Component {
	props: Props;
	state: State = {};

	render() {
		return (
			<View style={{ flex: 1, paddingTop: Scales.statusBarHeight, paddingBottom: 10 }}>
				<TabList />
				<List>
					<ListItem
						title="タグ一覧"
						leftIcon={{ name: IconName.tag }}
						onPress={() => {
							Actions.refresh({ key: 'drawer', open: false });
							setTimeout(() => Actions.tagsScreen());
						}}
					/>
					<ListItem
						title="開発者・リクエスト"
						leftIcon={{ name: IconName.send }}
						onPress={() => {
							Linking.openURL('https://sites.google.com/view/ssconnect/サポート');
						}}
					/>
				</List>
			</View>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
