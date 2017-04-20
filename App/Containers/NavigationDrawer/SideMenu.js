import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectTabProfiles } from '../App/selectors';

import TabList from '../../Components/TabList';
import { Scales } from '../../Themes';
import type { TabProfile } from '../../Types';

type Props = {
	tabProps: array<TabProfile>,
};

class SideMenu extends React.Component {
	props: Props;
	render() {
		return (
			<View style={{ flex: 1, paddingTop: Scales.statusBarHeight }}>
				<TabList tabs={this.props.tabProps} />
			</View>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	tabProps: makeSelectTabProfiles(),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
