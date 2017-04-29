// @flow

import React from 'react';
import { Tabs, Tab, Icon } from 'react-native-elements';

import BaseScreen from '../Base';
// import { IconName } from '../../themes';
import type { Profile } from '../../types';

type Props = {
	profiles: Array<Profile>,
};

type State = {
	selectedTab: string,
};

export default class TabBar extends React.PureComponent {
	props: Props;
	state: State = { selectedTab: 'feed' };

	changeTab(selectedTab: string) {
		this.setState({ selectedTab });
	}

	render() {
		const { profiles } = this.props;
		const { selectedTab } = this.state;

		return (
			<Tabs>
				<Tab
					titleStyle={{ fontWeight: 'bold', fontSize: 10 }}
					selectedTitleStyle={{ marginTop: -1, marginBottom: 6 }}
					selected={selectedTab === 'feed'}
					title={selectedTab === 'feed' ? 'FEED' : null}
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
					onPress={() => this.changeTab('feed')}
				>
					<BaseScreen profile={profiles[0]} />
				</Tab>
			</Tabs>
		);
	}
}
