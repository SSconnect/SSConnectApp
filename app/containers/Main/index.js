// @flow

import React from 'react';
import 'react-native';
import { connect } from 'react-redux';
import { Tabs, Tab, Icon } from 'react-native-elements';
import _ from 'lodash';
import ProfileTab from '../../components/ProfileTab';

import type { Profile } from '../../types';

import { selectProfiles } from '../../reduxs/selectors';
import { profileSerialKey } from '../../types/utils';

type Props = {
	profiles: Array<Profile>,
};

type State = {
	selectedTab: string,
};

class RootContainer extends React.PureComponent {
	props: Props;
	state: State = { selectedTab: profileSerialKey({}) };

	componentDidMount() {}

	componentWillReceiveProps() {
		this.forceUpdate();
	}

	render() {
		const { profiles } = this.props;
		const { selectedTab } = this.state;
		const tabProps = {
			selectedTab,
			onTap: name => this.setState({ selectedTab: name }),
		};

		const tabs = _.map(profiles, profile => (
			<ProfileTab key={profileSerialKey(profile)} profile={profile} {...tabProps} />
		));

		return (
			<Tabs>
				<ProfileTab profile={{}} {...tabProps} />
			</Tabs>
		);
	}
}

const mapStateToProps = (state, props) => ({
	profiles: selectProfiles(state, props),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
