import React from 'react';
import { View, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'react-native-elements';

import TabList from './TabList';

import { makeSelectProfiles } from '../../reduxs/selectors';

import { Scales, IconName } from '../../themes';
import type { Profile } from '../../types';

type Props = {
	profiles: array<Profile>,
};

type State = {};

class SideMenu extends React.Component {
	props: Props;
	state: State = {};

	render() {
		return (
			<View style={{ flex: 1, paddingTop: Scales.statusBarHeight, paddingBottom: 10 }}>
				{this.renderEmpty()}
				<TabList profiles={this.props.profiles} />
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

	renderEmpty() {
		const { profiles } = this.props;
		if (profiles.length > 0) {
			return null;
		}
		return (
			<Text style={{ padding: 10 }}>
				検索キーワードや作品タグをブックマークしましょう！
			</Text>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	profiles: makeSelectProfiles(),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
