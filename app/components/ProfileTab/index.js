import React from 'react';
import { Tab, Icon } from 'react-native-elements';

import type { Profile } from '../../types';
import type { BaseScreen } from '../../containers/Base';

type Props = {
	key: string,
	profile: Profile,
	selectedTab: string,
	onPress: Function,
};

export default class ProfileTab extends React.PureComponent {
	props: Props;

	render() {
		const { profile, selectedTab, onPress, key } = this.props;
		debugger;
		return (
			<Tab
				titleStyle={{ fontWeight: 'bold', fontSize: 10 }}
				selectedTitleStyle={{ marginTop: -1, marginBottom: 6 }}
				selected={selectedTab === key}
				title={profile.q}
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
				onPress={onPress(key)}
			>
				<BaseScreen profile={profile} />
			</Tab>
		);
	}
}
