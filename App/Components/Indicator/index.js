import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';

import {Colors} from '../../Themes/';

const Styles = {
	indicator: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8
	}
};

type Props = {
	loading: boolean
}

function Indicator({loading = ture}: Props) {
	if (!loading) {
		return null;
	}
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}} >
			<Spinner size={60} type="9CubeGrid" color={Colors.black}/>
		</View>
	);
}

export default Indicator;
