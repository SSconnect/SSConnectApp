// @flow

import React from 'react';
import { Button } from 'react-native-elements';

import { IconName } from '../../themes/';

type Props = {
	icon: Object,
	onPress: Function,
};

class PagingButton extends React.PureComponent {
	props: Props;
	static defaultProps: Props = {
		icon: { name: IconName.threeBar },
		onPress: () => {},
	};

	render() {
		const { icon, onPress } = this.props;
		return (
			<Button
				style={{ flex: 1 }}
				buttonStyle={{
					padding: 8,
					borderRadius: 3,
					marginLeft: 3,
					marginRight: 3,
					marginTop: 3,
				}}
				icon={icon}
				onPress={onPress}
			/>
		);
	}
}

export default PagingButton;
