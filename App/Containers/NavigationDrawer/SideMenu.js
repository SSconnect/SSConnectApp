import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Icon } from 'react-native-elements';

import { makeSelectTabProfiles } from '../App/selectors';

import TabList from '../../Components/TabList';
import { Scales, IconName } from '../../Themes';
import type { TabProfile } from '../../Types';

type Props = {
	tabProps: array<TabProfile>,
};

type State = {
	isEdit: boolean,
};

class SideMenu extends React.Component {
	props: Props;
	state: State = {
		isEdit: false,
	};

	render() {
		return (
			<View style={{ flex: 1, paddingTop: Scales.statusBarHeight }}>
				{this.renderEmpty()}
				<TabList tabs={this.props.tabProps} {...this.state} />
				<View style={{ padding: 10, alignItems: 'center' }}>
					<Icon
						name={IconName.config}
						size={20}
						raised={!this.state.isEdit}
						reverse={this.state.isEdit}
						onPress={() => {
							this.setState({ isEdit: !this.state.isEdit });
						}}
					/>
				</View>
			</View>
		);
	}

	renderEmpty() {
		const { tabProps } = this.props;
		if (tabProps.length > 0) {
			return null;
		}
		return (
			<Text>
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
