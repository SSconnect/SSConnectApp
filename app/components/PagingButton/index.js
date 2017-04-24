// @flow

import React from 'react';
import { Button } from 'react-native-elements';

import { IconName } from '../../themes/';

type Props = {
	icon: Object,
	onPress: Function,
	disabled: boolean,
};

class PagingButton extends React.PureComponent {
	props: Props;
	static defaultProps: Props = {
		icon: { name: IconName.threeBar },
		onPress: () => {},
		disabled: false,
	};

	render() {
		const { icon, onPress, disabled } = this.props;
		return (
			<Button
				disabled={disabled}
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
