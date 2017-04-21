import React from 'react';
import { View, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'react-native-elements';

import TabList from './TabList';

import { makeSelectTabProfiles } from '../../reduxs/selectors';

import { Scales, IconName } from '../../themes';
import type { TabProfile } from '../../types';

type Props = {
	tabProps: array<TabProfile>,
};

type State = {};

class SideMenu extends React.Component {
	props: Props;
	state: State = {};

	render() {
		return (
			<View style={{ flex: 1, paddingTop: Scales.statusBarHeight, paddingBottom: 10 }}>
				{this.renderEmpty()}
				<TabList tabs={this.props.tabProps} />
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
		const { tabProps } = this.props;
		if (tabProps.length > 0) {
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
	tabProps: makeSelectTabProfiles(),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
