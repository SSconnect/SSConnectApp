import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Icon } from 'react-native-elements';

import { makeSelectTabProfiles } from '../App/selectors';

import TabList from '../../Components/TabList';
import { Scales } from '../../Themes';
import type { TabProfile } from '../../Types';

type Props = {
	tabProps: array<TabProfile>,
};

type State = {};

class SideMenu extends React.Component {
	props: Props;
	state: State = {};

	render() {
		return (
			<View style={{ flex: 1, paddingTop: Scales.statusBarHeight }}>
				{this.renderEmpty()}
				<TabList tabs={this.props.tabProps} />
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
