// @flow

import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../../Themes';

const styles = StyleSheet.create({
	tabText: {
		color: 'black'
	},
	tabTextActive: {
		color: 'gray'
	}
});

const TabIcon = (props: any) => (
	<View>
		<Icon
			containerStyle={{
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 5
			}}
			color={Colors.black}
			name={props.iconName}
			size={25}
			/>
		<Text
			style={{color: Colors.black}}
			>
			{props.selected ? props.tabTitle : ''}
		</Text>
	</View>
  );

export default TabIcon;
