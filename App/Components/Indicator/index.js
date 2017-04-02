import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

import { Colors } from '../../Themes/';

type Props = {
	loading: boolean
}

function Indicator({ loading = true }: Props) {
	if (!loading) {
		return null;
	}
	return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }} >
    <Spinner size={60} type="9CubeGrid" color={Colors.black} />
  </View>
	);
}

export default Indicator;
