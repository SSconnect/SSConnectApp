import React from 'react';
import { View, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

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
				<Button
					title="開発者・リクエスト"
					icon={{ name: IconName.send }}
					onPress={() => {
						Linking.openURL('https://sites.google.com/view/ssconnect/サポート');
					}}
				/>
				<Button
					title="開発者・リクエスト"
					icon={{ name: IconName.send }}
					onPress={() => {
						Linking.openURL('https://sites.google.com/view/ssconnect/サポート');
					}}
				/>
			</View>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
