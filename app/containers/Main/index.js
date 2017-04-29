// @flow

import React from 'react';
import 'react-native';
import { connect } from 'react-redux';
import { Tabs, Tab, Icon } from 'react-native-elements';
import _ from 'lodash';

import BaseScreen from '../Base';

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

	renderTab(profile: Profile) {
		const { selectedTab } = this.state;
		const key = profileSerialKey(profile);
		return (
			<Tab
				key={key}
				titleStyle={{ fontWeight: 'bold', fontSize: 10 }}
				selectedTitleStyle={{ marginTop: -1, marginBottom: 6 }}
				selected={selectedTab === key}
				title={profile.q || profile.tag || 'ホーム'}
				renderIcon={() => (
					<Icon
						containerStyle={{
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 12,
						}}
						color={'#5e6977'}
						name="whatshot"
						size={33}
					/>
				)}
				renderSelectedIcon={() => <Icon color={'#6296f9'} name="whatshot" size={30} />}
				onPress={() => this.setState({ selectedTab: key })}
			>
				<BaseScreen profile={profile} />
			</Tab>
		);
	}

	render() {
		const { profiles } = this.props;
		const tabs = _.map(profiles, profile => this.renderTab(profile));

		return (
			<Tabs>
				{this.renderTab({ q: '', tag: '' })}
				{tabs}
			</Tabs>
		);
	}
}

const mapStateToProps = (state, props) => ({
	profiles: selectProfiles(state, props),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
