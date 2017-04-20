// @flow

import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

import { Colors } from '../../Themes/';

type Props = {
	loading: boolean,
};

class Indicator extends React.PureComponent {
	props: Props;
	static defaultProps: Props = {
		loading: true,
	};

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
				<Spinner size={60} type="9CubeGrid" color={Colors.black} />
			</View>
		);
	}
}

export default Indicator;
